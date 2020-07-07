//** @jsx jsx */
import React from "react"
import { Flex, jsx } from "theme-ui"

import { MDXRenderer } from "gatsby-plugin-mdx"

import noUserImage from "@public/no-user-image.png"
import noCompanyImage from "@public/no-company-image.png"

const Result = ({ children, frontmatter, rawBody, body }) => {
  const hasImage = rawBody ? rawBody.includes("![") : false

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
        borderBottom: ["1px solid", "unset", "unset"],
        borderColor: "filterBorder",
        paddingBottom: "0.7rem",
        "& > .title": {
          fontSize: ["1.4rem", "1.25em", "1.25em"],
          margin: "0 0 .5rem",
          order: 0,
          color: "primary",
        },
        "& > .location": {
          order: 1,
          m: [0, "0 .5rem 1rem 0", "0 .5rem 1rem 0"],
        },
        "& > img": {
          order: 2,
          width: "100%",
          maxWidth: ["unset", "unset", "405px"],
          height: "300px",
          mt: ["0.64rem", "unset", "unset"],
          objectFit: "cover",
          borderRadius: "5px",
        },
        "& > .skills": { order: 3 },
        "& > .website": { order: 4 },
        "& > .personal": { order: 5 },
        "& > .business": { order: 6 },
        "& > .games": { order: 7 },
      }}
    >
      {!hasImage && (
        <img
          alt={frontmatter.isCompany ? "No Company Image" : "No Game Dev Image"}
          src={frontmatter.isCompany ? noCompanyImage : noUserImage}
        />
      )}
      <MDXRenderer>{body}</MDXRenderer>
    </Flex>
  )
}

export default Result
