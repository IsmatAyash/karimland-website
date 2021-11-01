// const path = require("path")
// const slugify = require("slugify")
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const result = await graphql(`
//     query GetTags {
//       product {
//         listProducts {
//           items {
//             tags
//           }
//         }
//       }
//     }
//   `)

//   const prods = await graphql(`
//     query getProducts {
//       product {
//         listProducts {
//           items {
//             title
//             id
//           }
//         }
//       }
//     }
//   `)

//   prods.data.product.listProducts.items.forEach(prod => {
//     const prodSlug = slugify(prod.title, { lower: true })
//     createPage({
//       path: `/${prodSlug}`,
//       component: path.resolve(`src/templates/product-template.js`),
//       context: { id: prod.id },
//     })
//   })

//   result.data.product.listProducts.items.forEach(product => {
//     product.tags.forEach(tag => {
//       const tagSlug = slugify(tag, { lower: true })
//       createPage({
//         path: `/${tagSlug}`,
//         component: path.resolve(`src/templates/tag-template.js`),
//         context: {
//           tag: tag,
//         },
//       })
//     })
//   })
// }

// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions

//   // page.matchPath is a special key that's used for matching pages
//   // only on the client.
//   if (page.path.match(/^\/app/)) {
//     page.matchPath = `/app/*`

//     // Update the page.
//     createPage(page)
//   }
// }
