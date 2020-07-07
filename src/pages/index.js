/** @jsx jsx */
import React from "react"

import { Box, jsx } from "theme-ui"

import { useSite } from "@layouts/SiteContext"
import ResultSection from "@search/ResultSection"
import Search from "@search"

const Index = ({ data, location }) => {
  const { filters, results } = useSite()

  const peopleResults = Object.values(
    Object.filter(
      results,
      entry =>
        !entry.frontmatter.isCompany &&
        (filters.length > 0
          ? filters.every(f => {
              if (!entry[f.set] || !entry[f.set].length) return false

              return entry[f.set].find(n => n.key === f.key)
            })
          : true)
    )
  )

  const companyResults = Object.values(
    Object.filter(
      results,
      entry =>
        entry.frontmatter.isCompany &&
        (filters.length > 0
          ? filters.every(f => {
              if (!entry[f.set] || !entry[f.set].length) return false

              return entry[f.set].find(n => n.key === f.key)
            })
          : true)
    )
  )

  return (
    <Box
      sx={{
        "& > *:last-child > h2 > .jump-section-element": {
          display: "none",
        },
      }}
    >
      <Search />
      <ResultSection
        results={peopleResults}
        noun={"someone"}
        jumpToSection={"Companies"}
      >
        People
      </ResultSection>
      <ResultSection results={companyResults} noun={"a company"}>
        Companies
      </ResultSection>
    </Box>
  )
}

export default Index
