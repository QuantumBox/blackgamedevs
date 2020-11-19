// This file is the site's global state that's provided through
// React's Context API.
// You'll most likely see the use of useSite to access context.
import React, { createContext, useContext, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { sanitizeFilter, flattenFilter, markdownLinkRegex } from "@utils"

export const SiteContext = createContext()

export const useSite = () => {
  const context = useContext(SiteContext)
  if (context === undefined) {
    throw new Error("useSite must be used within a SiteProvider")
  }

  return context
}

const SiteProvider = ({ children, value }) => {
  //Get all the results data (directory)
  const { directory } = useStaticQuery(graphql`
    {
      directory: allMdx(
        filter: { fileAbsolutePath: { regex: "//directory//" } }
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            body
            rawBody
            headings(depth: h1) {
              value
            }
            frontmatter {
              isCompany
            }
          }
        }
      }
    }
  `)

  const AllFilters = {}
  const ExistsFilters = [{fragment: "Games", regex: markdownLinkRegex, label: "Games available"}]
  const filterFragments = ["Skills", "Location"] //<- Update this to match React Fragment keynames for filtering!

  //Transform that data into something consumable (People, Companies)
  //NOTE(Rejon): I would use graphql to sort by heading value, but graphql is case sensitive. 
  //             So lower case elements would always be last :/
  //NOTE(Rejon): Used to securely match result ids to data for rendering when searching/filtering 
  const AllData = directory.edges
  .sort((a, b) => a.node.headings[0].value.localeCompare(b.node.headings[0].value))
  .reduce((obj, { node }) => {
    let filterData = {}

    //Filter out empty strings, trim whitespace, convert to camelCase for key consistency
    //NOTE(Rejon): The 2nd argument in this SHOULD match the component key ie. <Skills>
    filterFragments.map(fragment => {
      if (node.rawBody.includes(`<${fragment}>`)) {
        //If we haven't touched this fragment before we need to update All Filters.
        if (!AllFilters[fragment]) {
          AllFilters[fragment] = []
        }

        const _filter = sanitizeFilter(node.rawBody, fragment)

        filterData[fragment] = _filter
        //NOTE(Rejon): Because filters are automagically generated we do the heavy lifting to sanitize text.
        //             We do this to get our filters into something consistent for comparisons, rendering, and querying via input.
        AllFilters[fragment].push(_filter)
      }
    })


    //Map for "Has" filters.
    //Checks if exists filters with their regex match 
    //has a quantifiable amount to suggest an entry "Having [X]" 
    ExistsFilters.map(({fragment, label, regex}) => {
      
      if (node.rawBody.includes(`<${fragment}>`)) {
        const fragmentBody = node.rawBody.substring(
          node.rawBody.lastIndexOf(`<${fragment}>`) + (fragment.length + 3),
          node.rawBody.lastIndexOf(`</${fragment}>`)
        )

        //If there's a match on our regex
        //this entry HAS the fragment data.
        if (regex.test(fragmentBody))
        {
          if (!AllFilters['Has']) {
            AllFilters['Has'] = [];
          }

          if (!filterData['Has']) {
            filterData['Has'] = [];
          }

          const hasFilterData = {
            label: label || fragment,
            key: fragment,
            set: 'Has'
          };

          filterData['Has'].push(hasFilterData)
          AllFilters['Has'].push(hasFilterData)
        }
      }
    })

    return (
      (obj[node.id] = {
        ...node,
        ...filterData,
      }),
      obj
    )
  }, {})

  const [filters, setFilters] = useState([]) //Filter State
  const [results, setResults] = useState(AllData) //Current search query

  //Ensure unique filters.
  Object.keys(AllFilters).map(set => {
    AllFilters[set] = flattenFilter(AllFilters[set])
  })

  //Method call that takes a filter object and whether we're toggling, or just activating.
  const setFilter = (filter, toggle) => {
    const indexOfFilter =
      filters.length > 0 ? filters.findIndex(f => f.key === filter.key) : -1

    if (toggle) {
      if (indexOfFilter !== -1) {
        //Remove the filter
        setFilters(prevFilters =>
          [...prevFilters].filter(n => n.key !== filter.key)
        )
      } else {
        //Add filter if it doesn't exist.
        setFilters(prevFilters => [...prevFilters, filter])
      }
    } else {
      //Just activate/add a filter, no toggle.
      if (indexOfFilter === -1) {
        //Add filter if it doesn't exist.
        setFilters(prevFilters => [...prevFilters, filter])
      }
    }

    if (window.scrollY >= 364) {
      window.scrollTo({ top: 0 })
    }
    
  }

  //Method call that removes filters entirely, or by a specific set.
  const clearFilters = set => {
    if (set) {
      setFilters(prevFilters => [...prevFilters].filter(n => n.set !== set))
    } else {
      setFilters([])
    }

    if (window.scrollY >= 364) {
      window.scrollTo({ top: 0 })
    }
  }

  return (
    <SiteContext.Provider
      value={{
        filters,
        setFilter,
        clearFilters,
        results,
        setResults,
        AllData,
        AllFilters,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export default SiteContext
export { SiteProvider }
