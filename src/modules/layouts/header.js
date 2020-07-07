// This is the header component that gets used by site_layout.
// It pulls down the header.mdx content and renders its mdx.

// If you want to update the header's content I recommend using the mdx file
// but if you know your way around, go crazy :)
//** @jsx jsx  */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, jsx } from "theme-ui"

import shortcodes from "@ui/shortcodes.js"

const Header = () => {
  const { allMdx: edges } = useStaticQuery(graphql`
    query MyQuery {
      allMdx(filter: { fileAbsolutePath: { regex: "/header.mdx/" } }) {
        edges {
          node {
            body
          }
        }
      }
    }
  `)

  if (edges.edges[0] === undefined) {
    return <></>
  }

  return (
    <Box
      sx={{
        "& > *": { color: "primary" },
        "& > h1": { fontSize: "3rem", lineHeight: "1.25em", mb: ".35em" },
        fontFamily: "heading",
      }}
    >
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{edges.edges[0].node.body}</MDXRenderer>
      </MDXProvider>
    </Box>
  )
}

export default Header
