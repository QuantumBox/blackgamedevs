// This is the footer component that gets used by site_layout.
// It pulls down the footer.mdx content and renders its mdx.

// If you want to update the footer's content I recommend using the mdx file
// but if you know your way around, go crazy :)
//** @jsx jsx */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, jsx } from "theme-ui"

import shortcodes from "@ui/shortcodes"

const Footer = () => {
  const { allMdx: edges } = useStaticQuery(graphql`
    query GetFooter {
      allMdx(filter: { fileAbsolutePath: { regex: "/footer.mdx/" } }) {
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
        fontFamily: "heading",
        borderTop: "1px dotted",
        borderColor: "border",
        mt: "3rem",
      }}
    >
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{edges.edges[0].node.body}</MDXRenderer>
      </MDXProvider>
    </Box>
  )
}

export default Footer
