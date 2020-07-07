/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { GraphQLJSONObject } = require(`graphql-type-json`)
const lunr = require(`lunr`)

//NOTE(Rejon): I copy/pasted sanitize filter from our utils file because importing here is different on builds.
//             I wanted to decouple client facing code from build related code.
const sanitizeFilter = (rawBody, fragment, normalize) =>
  rawBody
    .substring(
      rawBody.lastIndexOf(`<${fragment}>`) + (fragment.length + 3),
      rawBody.lastIndexOf(`</${fragment}>`)
    )
    .replace(/[-.#`!*()]["]|[0-9]\./g, "") //Replace MD usual characters with empty
    .split("\n") //Split by new lines
    .filter(n => n !== "")
    .map(n => {
      let label = n.trim()

      //"Normalizing" means removing tildes, hyphens, spaces, and NFD normalization to make it easier to search unique names.
      //NOTE(Rejon): This is because LUNR is picky about it's token handling. Rejon will show 0 results unless typed Réjon.
      //             TLDR: Better search experience > exact term searching.
      if (normalize) {
        label = label
          .replace(/\s/g, "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]|-/g, "")
      }

      return label
    })

//This is the method that builds our index with Lunr.
//It's pretty complex, and LUNR has terrible documentation.
//So please follow this for the BEST documentation offered: https://css-tricks.com/how-to-add-lunr-search-to-your-gatsby-website/
const createIndex = async (dirNodes, type, cache) => {
  //NOTE(Rejon): Our index is data handled through graphql queries,
  //             so we can Cache it! This speeds up builds if none of our data has changed.
  const cacheKey = `IndexLunr`
  const cached = await cache.get(cacheKey)
  if (cached) {
    return cached
  }
  const documents = []
  const store = {}
  // Iterate over all posts
  for (const node of dirNodes) {
    const { rawBody, id } = node
    const doc = {
      name: rawBody
        .split("\n") //Split by new lines
        .find(n => n[0] === "#") //Grab name by first H1 "#" that appears
        .replace(/^#\s/, ""),
      nameNormalized: rawBody
        .split("\n")
        .find(n => n[0] === "#")
        .replace(/^#\s/, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]|-/g, ""),
      locations: sanitizeFilter(rawBody, "Location"),
      locationsNormalized: sanitizeFilter(rawBody, "Location", true),
      skills: sanitizeFilter(rawBody, "Skills"),
      skillsNormalized: sanitizeFilter(rawBody, "Skills", true),
      id,
      type: node.frontmatter.isCompany ? "companies" : "people", //NOTE(Rejon): This is hardcoded, but if there will be more than people and companies, change the frontmatter to be a string instead.
    }
    documents.push(doc)
    store[id] = {
      id: doc.id,
      type: doc.type,
    }
  }

  //NOTE(Rejon): If any of these indexes don't match key names in the document. Running a search WILL crash.
  const index = lunr(function () {
    this.ref(`id`)

    //NOTE: I would prefer to do an object key comparison loop to get these fulfilled,
    //      but this works for now.
    this.field(`name`)
    this.field(`nameNormalized`)
    this.field(`locationsNormalized`)
    this.field(`locations`)
    this.field(`skills`)
    this.field(`skillsNormalized`)
    this.field(`id`)
    this.field(`type`)
    this.pipeline.remove(lunr.stopWordFilter) //<- Remove stopWords like "is" or "and". Some names/countries start and end in these words.
    for (const doc of documents) {
      this.add(doc)
    }
  })

  const json = { index: index.toJSON(), store }

  await cache.set(cacheKey, json)
  return json
}

//Create a GraphQL resolver by grabbing all of our MDX nodes,
//from our directories folder and returning our LUNR index.
//NOTE(Rejon): This is how LunrIndex becomes available through GraphQL
exports.createResolvers = ({ cache, createResolvers }) => {
  createResolvers({
    Query: {
      LunrIndex: {
        type: GraphQLJSONObject,
        resolve: (source, args, context, info) => {
          const directoryNodes = context.nodeModel
            .getAllNodes({
              type: `Mdx`,
            })
            .filter(
              node =>
                node.fileAbsolutePath &&
                node.fileAbsolutePath.match(/(\/directory\/).+/) !== null
            )
          const type = info.schema.getType(`Mdx`)
          return createIndex(directoryNodes, type, cache)
        },
      },
    },
  })
}
