/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Karimland Farm",
    slogan: "Farm to Table",
    description:
      "Agriculture in Kuwait is still in its entry stage, this business is sustainable, environmentally friendly, it cares about a persons well-being",
    author: "@ismatayash",
    person: { name: "Ismat", age: 56 },
    simpleData: ["item 1", "item 2"],
    complexData: [
      { name: "Alexy", age: 12 },
      { name: "Andrew", age: 9 },
      { name: "Wissam", age: 47 },
    ],
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `lqhquv9fy7fo`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Montserrat",
              variants: ["400", "700", "900"],
            },
            {
              family: "Inconsolata",
              variants: ["400", "500", "600", "700"],
            },
          ],
        },
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "Product",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "product",
        // Url to query from
        url: "https://hcn2ijtspbdfrhlz5u2pkeeezm.appsync-api.eu-west-2.amazonaws.com/graphql",
        headers: {
          "x-api-key": "da2-vn5yd7brtrhpfjra2ym7hlmw3u",
        },
      },
    },
  ],
}
