// This is the footer component that gets used by site_layout.
// It pulls down the footer.mdx content and renders its mdx.

// If you want to update the footer's content I recommend using the mdx file
// but if you know your way around, go crazy :)
//** @jsx jsx */
import React from "react"
import Link from "@modules/utility/Link"
import { Box, jsx } from "theme-ui"
const Footer = () => {
  return (
    <Box
      sx={{
        color: "primary",
        fontFamily: "heading",
        borderTop: "1px dotted",
        borderColor: "border",
        mt: "3rem",
        pt: 3
      }}
    >
      A project by 
      <Link to="https://quantumbox.itch.io/" sx={{ml: 1}}>Arthur Ward, Jr.</Link>, 
       <Link to="https://cattsmall.com" sx={{ml: 1}}>Catt Small</Link>,
      & <Link to="https://chrisalgoo.com"> Chris Agloo</Link>.
       Want to add to the list? <Link to="https://forms.gle/M3SVa3YE4F1kLm8p7">Go here.</Link>
      <br/>
      <br/>
      Maxed out with love by <Link to="https://rejontaylor.com">Réjon Taylor-Foster (@Maximum_Crash)</Link>
    </Box>
  )
}

export default Footer
