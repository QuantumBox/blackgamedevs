//** @jsx jsx */
import React, { useState, useRef } from "react"
import { Text, Box, Flex, jsx } from "theme-ui"
import SmoothCollapse from "react-smooth-collapse"

import minusIcon from "@public/minus-icon.svg"
import { useSite } from "@layouts/SiteContext"
import Button from "@modules/ui/Button"
import { groupBy } from "@utils"

const FilterHeader = ({ onClick, filtersOpen }) => (
  <Text
    as="h2"
    sx={{
      color: "primary",
      cursor: "pointer",
      position: "relative",
      display: "inline-block",
      fontWeight: "normal",
    }}
    onClick={onClick}
  >
    Filters
    <Box
      sx={{
        opacity: "0.64",
        width: "25px",
        height: "25px",
        position: "relative",
        display: "inline-block",
        ml: ".46rem",
        top: "4px",
      }}
    >
      <img
        src={minusIcon}
        alt="expand icon"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "invert(80%)",
        }}
      />
      <img
        src={minusIcon}
        className={filtersOpen ? "hide" : ""}
        alt="expand icon"
        sx={{
          transform: `translate(-50%, -50%) rotate(90deg)`,
          position: "absolute",
          top: "50%",
          right: "-11px",
          transition: "all .1s ease",
          filter: "invert(80%)",
          "&.hide": { transform: "translate(-50%, -50%) rotate(180deg)" },
        }}
      />
    </Box>
  </Text>
)

const FilterSet = ({
  children,
  filtersOfSet,
  filters,
  onClick,
  removeFilterSet,
  filtersSelected,
}) => {
  return (
    <>
      <Text
        sx={{
          fontSize: "1.16rem",
          mb: ".64rem",
          display: "flex",
          alignItems: "center",
          textTransform: "capitalize",
        }}
      >
        {children}:{" "}
        {filtersSelected && (
          <span
            onClick={removeFilterSet}
            sx={{
              ml: 3,
              fontSize: "14px",
              cursor: "pointer",
              textDecoration: "underline",
              color: "text_secondary",
            }}
          >
            Remove {children}
          </span>
        )}
      </Text>
      <Flex
        sx={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flexStart",
        }}
      >
        {filtersOfSet.map(filter => {
          const isActive =
            filters.length > 0 && filters.find(n => n.key === filter.key)

          return (
            <Button
              onClick={() => onClick(filter)}
              key={filter.key}
              sx={{
                textTransform: "capitalize",
                color: isActive ? "link_hover" : "text_secondary",
                borderColor: isActive ? "link_hover" : "filterBorder",
                "&:hover": {
                  color: isActive ? "link_hover" : "text",
                  borderColor: isActive ? "link_hover" : "text",
                },
              }}
            >
              {filter.label}
            </Button>
          )
        })}
      </Flex>
    </>
  )
}

const Filters = () => {
  const filterListEl = useRef(null)
  const { AllFilters, filters, setFilter, clearFilters } = useSite()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const groupedFilters = filters.length > 0 ? groupBy(filters, "set") : {}

  return (
    <Box>
      <Flex sx={{ alignItems: "center" }}>
        <FilterHeader
          onClick={() => {
            setFiltersOpen(!filtersOpen);
            
            if (filterListEl.current && filterListEl.current._main.current && !filtersOpen) {
              filterListEl.current._main.current.scrollTo({top: 0});
            }
          }}
          filtersOpen={filtersOpen}
        />
        {Object.keys(filters).length > 0 && (
          <Text
            sx={{
              color: "text_secondary",
              fontSize: "15px",
              display: "inline-block",
              ml: "1rem",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => clearFilters()}
          >
            Remove all filters
          </Text>
        )}
      </Flex>
      <SmoothCollapse
        expanded={filters.length > 0}
        sx={{
          pl: "1rem",
          pr: "1rem",
          mt: "0.32rem",
          position: "relative",
          visibility: ['none', 'visible', 'visible'],
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            width: "100%",
            transition: "all .164s easeInOut",
            height: "1px",
            backgroundColor: !filtersOpen ? "transparent" : "border",
            transform: !filtersOpen ? "scaleX(0)" : "scale(1)",
          },
          pb: 2,
        }}
      >
        {`Filtering by: `}
        {Object.keys(groupedFilters).map((type, index) => {
          return (
            <React.Fragment key={`filtering-by-${type}`}>
              <span
                sx={{ textTransform: "capitalize", color: "primary" }}
              >{`${type} `}</span>
              <span
                sx={{ color: "text_secondary", textTransform: "capitalize" }}
              >
                ({groupedFilters[type].map(({ label }) => label).join(", ")})
              </span>
              {index !== Object.keys(groupedFilters).length - 1 && (
                <span sx={{ fontWeight: "bold" }}>{` and `}</span>
              )}
            </React.Fragment>
          )
        })}
      </SmoothCollapse>
      <SmoothCollapse
        expanded={filtersOpen}
        ref={filterListEl}
        sx={{ pl: "1rem", pr: "1rem", mt: ".24rem", maxHeight: ['73vh', 'unset', 'unset'], overflow: filtersOpen ? 'auto !important' : 'hidden' }}
      >
        {Object.keys(AllFilters).map((set, index) => (
          <FilterSet
            filtersOfSet={AllFilters[set]}
            filters={filters}
            filtersSelected={
              filters.length > 0 && filters.some(n => n.set === set)
            }
            onClick={filter => setFilter(filter, true)}
            removeFilterSet={() => clearFilters(set)}
            key={`filter-set-${index}`}
          >
            {set}
          </FilterSet>
        ))}
      </SmoothCollapse>
    </Box>
  )
}

export default Filters
