//** @jsx jsx */
import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { jsx, Text, Box, Flex, Grid } from "theme-ui"

import Shortcodes from "@ui/shortcodes"
import Link from "@modules/utility/Link"
import ResultsRenderer from "@modules/search/ResultsRenderer"

//Renders a section of our results sorted by "name" (default).
//Animations are handled by Framer Motion with motion elements and Animate Presence.
const ResultSection = ({
  results,
  children,
  query,
  noun,
  jumpToSection,
  ...otherProps
}) => {
  return (
    <Box
      id={children}
      sx={{
        "&:not(:last-of-type)": {
          borderBottom: "2px dotted",
          borderColor: "border",
        },
      }}
    >
      <Text
        as="h2"
        sx={{ color: "primary", fontWeight: "normal", mb: 3, mt: 3 }}
      >
        {children}
        <span
          sx={{ fontSize: "1rem", color: "text_secondary" }}
        >{` (${results.length})`}</span>

        <Text
          className="jump-section-element"
          sx={{
            color: "text_secondary",
            fontSize: "15px",
            display: "inline-block",
            ml: "1rem",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() =>
            window.scrollTo({
              top: document.getElementById(jumpToSection).offsetTop,
              behavior: "smooth",
            })
          }
        >
          {" "}
          Jump to next section{" "}
        </Text>
      </Text>

      <MDXProvider components={Shortcodes}>
        {results && results.length > 0 && (
          <ResultsRenderer results={results} {...otherProps} />
        )}
      </MDXProvider>
      {results && results.length === 0 && (
        <Flex
          key={"no-results"}
          sx={{ flexDirection: "column", px: "1rem", mb: 3, textAlign: ['center', 'unset', 'unset'] }}
        >
          {query ? (
            <Text
              sx={{ fontWeight: "medium", fontSize: "1.5rem" }}
            >{`No results for ${query}`}</Text>
          ) : (
            <Text sx={{ fontWeight: "medium", fontSize: "1.5rem" }}>
              No Results...
            </Text>
          )}

          <Text>
            {`Think ${noun} is missing? Add them to the list `}
            <Link
              to="https://github.com/MaximumCrash/blackgamedevs_v2/issues/new/choose"
              sx={{ cursor: "pointer" }}
            >
              here.
            </Link>
          </Text>
        </Flex>
      )}
    </Box>
  )
}

export default ResultSection
