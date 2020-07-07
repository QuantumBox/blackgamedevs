//** @jsx jsx */
import React from "react"
import { Flex, jsx } from "theme-ui"

import Button from "@ui/Button"
import { useSite } from "@layouts/SiteContext"

const Skills = ({ children }) => {
  const { filters, setFilter, AllFilters } = useSite()
  const _Children = React.Children.toArray(children)

  const onClick = f => {
    const filter = AllFilters.Skills.find(n => n.label === f.trim()) //Some labels have a chance of spaces at the end based on user input error.
    setFilter(filter)
  }

  return (
    <Flex
      className="skills"
      sx={{
        flexWrap: "wrap",
        mt: "1rem",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {_Children.map((child, index) => {
        const isActive = filters.find(
          n => n.label === child.props.children.trim()
        )

        return (
          <Button
            sx={{
              fontSize: "15px",
              mr: ".25",
              textTransform: "capitalize",
              color: isActive ? "link_hover" : "text_secondary",
              borderColor: isActive ? "link_hover" : "text_secondary",
              "&:hover": {
                color: isActive ? "link_hover" : "text",
                borderColor: isActive ? "link_hover" : "text",
              },
              "&:hover > *": { color: isActive ? "link_hover" : "text" },
              "& > *": {
                color: isActive ? "link_hover" : "text_secondary",
                borderColor: isActive ? "link_hover" : "text_secondary",
              },
            }}
            key={`skill-child-${index}-${child}`}
            onClick={() => onClick(child.props.children)}
          >
            {child}
          </Button>
        )
      })}
    </Flex>
  )
}

export default Skills
