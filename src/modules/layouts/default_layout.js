/*
This is the layout that wraps all MDX type pages. 
See gatsby-config.js (gatsby-plugin-mdx)
*/
import React from "react"

import { MDXProvider } from "@mdx-js/react"

import shortcodes from "@ui/shortcodes"

export default props => {
  const { children } = props

  return (
    <MDXProvider components={shortcodes}>
      <article>{children}</article>
    </MDXProvider>
  )
}
