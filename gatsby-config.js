const path = require("path")

module.exports = {
  pathPrefix: "/blackgamedevs_v2",
  siteMetadata: {
    title: `Black Game Developers`,
    siteUrl: "https://blackgamedevs.com",
    description: `A list of black game developers, designers, artists, and more. Here they are. Hire them. Buy their stuff.`,
    author: `Arthur Ward, Jr, Catt Small, Chris Algoo, Réjon Taylor-Foster (@Maximum_Crash)`,
    keywords:
      "Black, game developers, designers, writers, artists, creatives, black game developers, directory, hiring, find black game developers",
    themeColor: "#EF3054",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `layouts`,
        path: `${__dirname}/src/modules/layouts/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `directory`,
        path: `${__dirname}/directory/`,
      },
    },
    {
      resolve: "gatsby-plugin-theme-ui",
      options: {
        prismPreset: "night-owl",
        preset: "@theme-ui/preset-funk",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-remark-unwrap-images",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve("./src/modules/layouts/default_layout.js"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 400,
              linkImagesToOriginal: false, 
              quality: 30,
              loading: 'lazy',
              wrapperStyle: result => `width: 100%;margin-left: 0;`,
            },
          },
          {
            resolve: "gatsby-remark-unwrap-images",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/modules/layouts/site_layout.js`),
      },
    },
    {
    resolve: 'gatsby-plugin-preconnect',
    options: {
      domains: ['https://localhost:9000', 'https://blackgamedevs.com'],
    },
  },
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Black Game Developers`,
        short_name: `BGD`,
        start_url: `/`,
        background_color: `#111`,
        theme_color: `#EF3054`,
        display: `standalone`,
        crossOrigin: `use-credentials`,
        include_favicon: false,
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          globPatterns: ["**/*"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://blackgamedevs.com",
        sitemap: "https://blackgamedevs.com/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: "Poppins",
            variants: [`300`, `400`, `700`],
          },
        ],
      },
    },
    {
      //NOTE(Rejon): This is what allows us to do aliased imports like "@modules/ect..."
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@src": path.resolve(__dirname, "src"),
          "@modules": path.resolve(__dirname, "src/modules"),
          "@layouts": path.resolve(__dirname, "src/modules/layouts"),
          "@ui": path.resolve(__dirname, "src/modules/ui"),
          "@utils": path.resolve(__dirname, "src/utils.js"),
          "@search": path.resolve(__dirname, "src/modules/search"),
          "@pages": path.resolve(__dirname, "src/pages"),
          "@public": path.resolve(__dirname, "public"),
          "@dir": path.resolve(__dirname, "directory"),
        },
        extensions: [
          //NOTE(Rejon): You don't have to write .js at the end of js files now.
          "js",
        ],
      },
    },
  ],
}
