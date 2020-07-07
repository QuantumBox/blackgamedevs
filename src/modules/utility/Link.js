/** @jsx jsx */
import React from "react"
import { jsx, Link as ThemeLink } from "theme-ui"

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = ({
  children,
  to,
  icon,
  activeClassName,
  partiallyActive,
  href,
  ...other
}) => {
  let linkHref = to || href

  ///HTTPS/HTTP checks
  //Ensure ALL links are HTTPS
  const hasHTTP = /^(http|https):\/\//i.test(linkHref)

  if (!hasHTTP) {
    linkHref = `https://${linkHref}`
  } else if (!/^(https)?:\/\//i.test(linkHref)) {
    linkHref = linkHref.replace(/^http?:\/\//, "https://")
  }

  return (
    <ThemeLink
      href={linkHref}
      {...other}
      target="_blank"
      rel="nofollow noopener noreferrer"
      sx={{ transition: "all .164s easeInOut" }}
    >
      {children}
    </ThemeLink>
  )
}
export default Link
