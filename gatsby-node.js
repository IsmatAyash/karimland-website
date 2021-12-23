const path = require("path")
const slugify = require("slugify")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    query getProds {
      prods: allMongodbKarimlandProducts {
        nodes {
          title
          tags
          mongodb_id
          id
        }
      }
    }
  `)

  data.prods.nodes.forEach(prod => {
    const prodSlug = slugify(prod.title, { lower: true })
    createPage({
      path: `/${prodSlug}`,
      component: path.resolve(`src/templates/product-template.js`),
      context: { id: prod.mongodb_id },
    })

    prod.tags.forEach(tag => {
      const tagSlug = slugify(tag, { lower: true })
      createPage({
        path: `/${tagSlug}`,
        component: path.resolve(`src/templates/tag-template.js`),
        context: {
          tag: tag,
        },
      })
    })
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`

    // Update the page.
    createPage(page)
  }
}
