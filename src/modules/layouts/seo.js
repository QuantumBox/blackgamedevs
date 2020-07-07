/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            keywords
            themeColor
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={site.siteMetadata.title}
      link={[{ rel: "icon", type: "image/png", href: "./favicon.ico" }]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: "keywords",
          content: site.siteMetadata.keywords,
        },
        {
          name: "theme-color",
          content: site.siteMetadata.themeColor,
        },
        {
          name: "author",
          content: site.siteMetadata.author,
        },
        {
          name: "title",
          content: title,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: "lang",
          content: "en-US",
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          property: "og:url",
          content: "https://blackgamedevs.com",
        },
        {
          property: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          property: `twitter:title`,
          content: title,
        },
        {
          property: "twitter:url",
          content: "https://blackgamedevs.com",
        },
        {
          property: `twitter:description`,
          content: metaDescription,
        },
        {
          property: "og:image",
          content: "https://blackgamedevs.com/site-logo.png",
        },
        {
          property: "twitter:image",
          content: "https://blackgamedevs.com/site-logo.png",
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
}

export default SEO
