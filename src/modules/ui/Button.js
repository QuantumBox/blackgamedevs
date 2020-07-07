//** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

import { motion } from "framer-motion"

const Button = ({ children, onClick, noTap, ...props }) => (
  <motion.button
    className="button"
    whileTap={!noTap ? { scale: 0.864 } : {}}
    {...props}
    transition={{ ease: "easeInOut", duration: 0.1 }}
    sx={{
      fontSize: "1rem",
      fontWeight: "normal",
      fontFamily: "body",
      borderRadius: "5px",
      border: "1px solid",
      mb: "1rem",
      mr: ".5rem",
      color: "text_secondary",
      borderColor: "filterBorder",
      padding: ".2rem .6rem",
      cursor: "pointer",
      transition: "all .1s ease",
      bg: "background",
      "& > *": {
        m: 0,
      },
      ":hover": {
        borderColor: "text",
        color: "text",
      },
      "&:hover > *": {
        color: "text",
      },
    }}
    onClick={onClick}
  >
    {children}
  </motion.button>
)

export default Button
