//** @jsx jsx */
import React from "react"
import { jsx, Box } from "theme-ui"

import Sticky from "react-sticky-el"
import SearchInput from "@search/SearchInput"
import Filters from "@search/filters"

const Search = () => (
    <Sticky
    dontUpdateHolderHeightWhenSticky={true}
    sx={{
      position: "relative",
      zIndex: "10",
      width: ["calc(100% + 40px)", "auto"],
      left: ["-20px", "unset"],

      "& > *": {
        position: "relative",
        bg: "background",
      },
    }}
    stickyStyle={{
      boxShadow:
        "rgba(0, 0, 0, 0.32) 0px 8px 15px -9px, rgba(0, 0, 0, 0.64) 0px 8px 7px -9px",
    }}
  >
    <Box
      sx={{
        p: 3,
        pb: 2,
        borderBottom: "1px dotted",
        borderTop: "1px dotted",
        borderColor: "border",
      }}
    >
      <SearchInput />
      <Filters />
    </Box>
  </Sticky>
  )

export default Search
