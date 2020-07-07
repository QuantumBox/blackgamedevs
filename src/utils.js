//Groups array of objects by a property.
export const groupBy = (arr, property) => {
  return arr.reduce((r, a) => {
    r[a[property]] = [...(r[a[property]] || []), a]
    return r
  }, {})
}

//Prototype for filter object data by a predicate.
Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {})

//Turns Hello World -> helloWorld
//Taken from: https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
export const camelize = str => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return "" // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

//Sanitizes our filter string based on the data contained between
//react component Fragments (ie. <Skills>{get everything between}</Skills>)
export const sanitizeFilter = (rawBody, fragment) =>
  rawBody
    .substring(
      rawBody.lastIndexOf(`<${fragment}>`) + (fragment.length + 3),
      rawBody.lastIndexOf(`</${fragment}>`)
    )
    .replace(/[-.#`!*()]["]|[0-9]\./g, "") //Replace MD usual characters with empty string
    .split("\n") //Split by new lines
    .filter(n => n !== "") //Remove empty strings
    .map(n => {
      const label = n.trim() //Remove whitespace from ends.
      const key = camelize(label) //camelCase our Key for easier management in code (NOTE): This is because ANYTHING can be a filter.

      const set = fragment //our filter "set"

      //Check and make sure our set always ends in "s"
      //NOTE(Rejon): <Location> -> locations
      return { label, key, set }
    })

//This is takes in AllFilters which come seperated by Skills/Location/ect. because of how our data is written.
//It outputs an array of filters flattend by their key.
//TLDR: Turns [ {{skills: {a, b, c}, locations: {d, e ,f}}, ...] -> [{skills: [all skills]}, {locations: [all locations]}]
export const flattenFilter = filtersOfSet =>
  filtersOfSet.flat(1).reduce((acc, current) => {
    const x = acc.find(item => item.key === current.key)
    if (!x) {
      return acc.concat([current])
    } else {
      return acc
    }
  }, [])
