// This is the layout file that wraps EVERY page of the site.
// This is where the footer/header live and where the site context is provided.
// If you want the Header/Footer components to access useSite, just wrap the
// SiteProvider around the header down to the footer instead of just the children.
import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { Box } from "theme-ui"

import { SiteProvider } from "@layouts/SiteContext"
import Shortcodes from "@ui/shortcodes"
import Header from "@layouts/header"
import Footer from "@layouts/footer"
import ScrollToTop from "@ui/ScrollToTop"
import Seo from "@layouts/seo"

const Layout = ({ children }) => (
  <Box
    sx={{
      m: "0 auto",
      padding: ["20px 20px 10px", "50px 20px 10px", "50px 20px 20px"],
      maxWidth: "1280px",
      fontFamily: "heading",
      bg: "background",
      color: "text",
      "& button:focus, & a:focus": {
        outline: theme => `${theme.colors.link_hover} auto 1px !important`,
      },
    }}
  >
    <Seo lang="en-US" />
    <Header />
    <MDXProvider components={Shortcodes}>
      <Box sx={{ position: "relative" }}>
        <SiteProvider>{children}</SiteProvider>
        <ScrollToTop />
      </Box>
    </MDXProvider>

    <Footer />
  </Box>
)

export default Layout
