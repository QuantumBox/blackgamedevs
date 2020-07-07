//** @jsx jsx */
import React, { useState, useEffect } from "react"

import Result from "@search/Result"
import Button from "@modules/ui/Button"
import { jsx } from "theme-ui"
import { motion } from "framer-motion"

const ResultsRenderer = ({ results, resultsPerPage = 12 }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const resultsToRender = results.slice(0, resultsPerPage * currentPage)

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [results])

  return (
    <>
      <motion.ul
        sx={{
          display: "grid",
          gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr"],
          gridGap: ["1rem", "2rem"],
          listStyleType: "none",
          p: 0,
          width: "calc(100%)",
        }}
      >
        {resultsToRender.map(({ id, ...otherProps }, index) => (
          <motion.li
            key={`result-obj-${id}-${index}`}
            initial={currentPage !== 1 ? { opacity: 0.1, y: 64, scale: 0.96 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
          >
            <Result {...otherProps} />
          </motion.li>
        ))}
      </motion.ul>
      {results.length - resultsPerPage * currentPage > 0 && (
        <Button
          sx={{
            width: "100%",
            p: 2,
            fontSize: "18px",
            mt: 4,
            bg: "primary",
            color: "background",
            border: "none",
            fontWeight: "bold",
          }}
          noTap
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {" "}
          {`Show more results (${
            results.length - resultsPerPage * currentPage
          }+)`}{" "}
        </Button>
      )}
    </>
  )
}

export default ResultsRenderer
