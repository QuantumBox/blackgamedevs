const fs = require("fs")
const got = require("got")
const stream = require("stream")
const { promisify } = require("util")
const pipeline = promisify(stream.pipeline)

const del = require("del")
const ora = require("ora")

const { bgdMinimizer } = require("./minimizeImages")
const people = require("../DEPRECATED/people.json") //<- Old People JSON
const companies = require("../DEPRECATED/companies.json") //<- Old Companies JSON
const { bgdMDX } = require("./mdxConverter")

//This is the preferred order we'd like to see the MDX data in.
//This is important for accessibility, because the results render in the order
//they are written. Even though we use the order: X property to ensure display
//consistency this means that folks who use screen readers will hear the order of content
//differently.
const preferredOrder = [
  "name",
  "location",
  "image",
  "skills",
  "websites",
  "business",
  "games",
  "ganes",
]

const acceptedImageEndings = ["png", "webp", "jpg", "gif", "gifv", "jpeg"] //<- This is for security, since we're dynamically creating filenames with file endings from a server response.

//The method that transforms our data into something consumable by json2md.
//Because json2md requires the data format to be: [{keyname: "String Data"}]
//we need to convert it like so: [{name: "Réjon Taylor-Foster"}]

//This data then gets parsed through the converters above into a format acceptable
//by our MDX files.
const entryTransformer = async (file, prog) => {
  file.splice(0, 1) //<- Remove the first element cause it's the template.

  const rollout = file.map(async entry => {
    const formatted = Object.keys(entry)
      .sort((a, b) => {
        //<- We sort the order here using preferredOrder
        return preferredOrder.indexOf(a) - preferredOrder.indexOf(b)
      })
      .filter(n => entry[n] !== "" && entry[n] !== null)
      .map(async field => {
        const returnObj = {}
        returnObj[field] = entry[field]

        //If the field is an image and it's not the image default.
        //We should download the photo and set the returnObj's alt properly.
        if (field === "image") {
          const imageName =
            entry.name
          .replace(/\s/g, "_")
          .replace(/[^a-zA-Z0-9\_]/g, "") ||
            entry[field]
              .match(/[ \w-]+\./g)
              .pop()
              .replace(/[^a-zA-Z0-9\_]/g, "")
              .replace(/\s/g, "_")

          if (entry[field] !== "http://image-link-here.com/image.png") {
              try { 
                const stream = await got(entry[field]); 
                const fileEnding = stream.headers['content-type'].split("/")[1];
                  
                //If the response file ending doesn't match our accepted
                //image endings. DO NOT create the file.
                //This is a security concern in the case of bad actors.
                if (acceptedImageEndings.includes(fileEnding)) {
                  returnObj[field] = {input: entry[field], imageAlt: imageName, fileEnding: fileEnding.replace(/png|jpg|jpeg/g, 'webp')};
                  fs.createWriteStream(`${__dirname}/tempImages/${imageName}_v1.${fileEnding}`).write(stream.rawBody);
                }
              } catch (err) {
                
                //Do Nothing, ignore the photo
                prog.warn(`Image Download Error(404/500) for ${entry.name}`)
              }
            }
        }

        return returnObj
      })

    const results = await Promise.all(formatted)

    return results
  })

  const output = await Promise.all(rollout)

  return output
}

//Final method run to minimize images and delete the tempImage directory we download images to.
const cleanUp = async () => {
  try {
    await bgdMinimizer() //<- See minimizeImages.js
    const cleanUpProg = ora("Clean up!").start()
    await del(`${__dirname}/tempImages`) //<- Delete the tempImages directory
    cleanUpProg.succeed("Whew chile...Clean up is all done!")

    console.info(`ℹ️ - Output now viewable in 'directory' folder. 😎👉👉 Enjoy`)
  } catch (err) {
    cleanUpProg.fail(
      "There was an issue during clean up. (Images not Minimized or tempImages file failed to be destroyed."
    )
  }
}

//The main function of this json-transformer script.
const main = () => {
  //If our tempImages directory doesn't exist create it.
  if (!fs.existsSync(`${__dirname}/tempImages`)) {
    fs.mkdirSync(`${__dirname}/tempImages`)
  }

  const peopleProg = ora("Preparing people.json for json2md").start()

  //Transform our people data.
  const tranformedPeople = entryTransformer(people, peopleProg).then(
    peopleData => {
      peopleProg.succeed()

      const peopleProgB = ora("Creating MDX files for People").start()

      peopleData.map((person, index) => {
        //<- Map through each individual person and make their MDX file.
        const { name } =
          person.find(n => Object.keys(n)[0] === "name") || `person_${index}` //Get their name
        const mdxData = bgdMDX(person) //<- Convert their data using our transformers.

        const fileName = name //<- Replace whitespaces with underscores and remove special characters from the filename
          .trim()
          .replace(/\s/g, "_")
          .replace(/[^a-zA-Z0-9\_]/g, "")

        //Create the file.
        fs.writeFile(
          `${__dirname}/../directory/${fileName}_v1.mdx`,
          mdxData,
          (err, data) => {
            if (err) return console.error(err, data)
          }
        )
      })

      peopleProgB.succeed()

      const companiesProg = ora("Preparing companies.json for json2md").start()

      //Do the same thing for the companies data.
      const tranformedCompanies = entryTransformer(
        companies,
        companiesProg
      ).then(companyData => {
        companiesProg.succeed()

        const companiesProgB = ora("Creating MDX files for Companies").start()

        companyData.map((company, index) => {
          const { name } =
            company.find(n => Object.keys(n)[0] === "name") ||
            `company_${index}`

          //NOTE(Rejon): For companies we just add the frontmatter isCompany.
          const mdxData = `---\nisCompany: true\n---\n\n${bgdMDX(company)}`

          const fileName = name
            .trim()
            .replace(/\s/g, "_")
            .replace(/[^a-zA-Z0-9\_]/g, "")

          fs.writeFile(
            `${__dirname}/../directory/${fileName}_v1.mdx`,
            mdxData,
            (err, data) => {
              if (err) return console.error(err, data)
            }
          )
        })

        companiesProgB.succeed()

        cleanUp()
      })
    }
  )
}

main() //<- What gets run when we run the script.
