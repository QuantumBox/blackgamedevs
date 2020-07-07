//** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

import { useSite } from "@layouts/SiteContext"
import Button from "@ui/Button"

const Location = ({ children }) => {
  const { setFilter, AllFilters, filters } = useSite()
  const filter = AllFilters.Location.find(
    n => n.label === children.props.children.trim()
  )

  const isActive = filters.find(n => n.label === children.props.children.trim())

  return (
    <Button
      className="location"
      onClick={() => setFilter(filter)}
      sx={{
        color: isActive ? "link_hover" : "text_secondary",
        borderColor: isActive ? "link_hover" : "text_secondary",
        "&:hover": {
          color: isActive ? "link_hover" : "text",
          borderColor: isActive ? "link_hover" : "text",
        },
        "&:hover > *": { color: isActive ? "link_hover" : "text" },
        "& > *": {
          m: 0,
          display: "inline-block",
          color: isActive ? "link_hover" : "text_secondary",
          borderColor: isActive ? "link_hover" : "text_secondary",
        },
        "::before": {
          content: '""',
          position: "relative",
          background: `url(./icon-location.svg)`,
          backgroundRepeat: "no-repeat",
          height: "19px",
          width: "12px",
          filter: "invert(80%)",
          display: "inline-block",
          verticalAlign: "middle",
          mr: ".5rem",
        },
      }}
    >
      {children}
    </Button>
  )
}

export default Location
