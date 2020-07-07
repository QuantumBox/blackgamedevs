const json2md = require("json2md") //<- We use this with custom converters to make our MDX content.

module.exports.bgdMDX = _input => {
  //Converts the name from JSON into "# NAME" for Markdown
  json2md.converters.name = (input, json2md) => {
    return `# ${input}`
  }

  //Grabs the image url, imageAlt (in the form of the persons name), and out puts it as
  //![ImageName](Image URL) <- Markdown Image
  json2md.converters.image = ({ input, imageAlt, fileEnding }) => {
    if (
      input === "http://image-link-here.com/image.png" ||
      typeof input === "undefined"
    ) {
      return ""
    }

    let imgURL = input
    const imageName =
      imageAlt ||
      input
        .match(/[ \w-]+\./g)
        .pop()
        .trim()
        .replace(".", "")
        .replace(/\s/g, "_")
        .replace(/[^a-zA-Z0-9\_]/g, "")

    return `![${imageName}](./directory_images/${imageName}_v1.${fileEnding})`
  }

  //Takes the skills data, removes any extra whitespace and renders
  //<Skills> ...each skill with a new line </Skills>
  //NOTE(Rejon): json2md likes to put commas in the strings sometimes, make sure to remove them.
  json2md.converters.skills = input => {
    return `<Skills>\n\n${input.map(
      skill => `${skill.trim()}\n\n`
    )}</Skills>`.replace(/\,/g, "")
  }

  //Converts the location data into
  //<Location> LOCATION NAME </Location>
  json2md.converters.location = input => {
    //Check for default
    if (input === "WRITE YOUR COUNTRY NAME HERE WITHOUT ACRONYMS") {
      return ""
    }

    return `<Location>\n\n${input.trim()}\n\n</Location>`
  }

  //Grabs the array of website arrays, checks against defaults to remove,
  //trims whitespace, and maps each website with a new line.
  //It renders like: <Website> [Website Name](https://website.com) ...continued </Website>

  //However, because there are different kinds of websites like "personal" or "business"
  //we make sure to support those with their own fragments like <Personal> and <Business>
  json2md.converters.websites = input => {
    const defaults = [
      "http://link-here.com",
      "https://twitter.com/username-here",
      "https://facebook.com/username-here",
      "https://instagram.com/username-here",
      "https://youtube.com/username-here",
      "https://www.patreon.com/username-here",
    ]

    //If the input is just an array, we use <Website> as a default
    //ie. Companies with website links on the site.
    if (Array.isArray(input)) {
      return `<Website>\n\n${input
        .filter(site => !defaults.includes(site[1])) //Filter out defaults.
        .map(
          site => `[${site[0].trim()}](${site[1] ? site[1].trim() : ""})\n\n`
        )}</Website>`.replace(/\,/g, "")
    } else {
      //Run through each array for a website type and render it with it's fragment.
      return Object.keys(input)
        .map(key => {
          const _data = input[key].filter(site => !defaults.includes(site[1])) //Filter out defaults

          const fragmentKey = key.charAt(0).toUpperCase() + key.slice(1)

          return `<${fragmentKey}>\n\n${_data.map(
            site => `[${site[0].trim()}](${site[1] ? site[1].trim() : ""})\n\n`
          )}</${fragmentKey}>`.replace(/\,/g, "")
        })
        .map(type => `${type}\n\n`.replace(/\,/g, ""))
        .join("")
    }
  }

  //Games are not part of the websites array.
  //But they are a carbon copy of the website rendering logic.
  //ie. <Games> [Game Name](https://game-website.com) ...continued </Games>
  json2md.converters.games = input => {
    const defaults = [
      "http://link-here.com",
      "https://twitter.com/username-here",
      "https://facebook.com/username-here",
      "https://instagram.com/username-here",
      "https://youtube.com/username-here",
      "https://www.patreon.com/username-here",
    ]

    return `<Games>\n\n${input
      .filter(game => !defaults.includes(game[1])) //Filter out defaults
      .map(game => `[${game[0]}](${game[1]})\n\n`)}</Games>`.replace(/\,/g, "")
  }

  //This is because there's a typo in the existing companies data.
  json2md.converters.ganes = json2md.converters.games

  return json2md(_input)
}
