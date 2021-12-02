import { gql } from "@apollo/client"
import QuantitySelector from "../components/ProductInfo/QuantitySelector"

export const AUTH_USER = gql`
  query AUTH_USER($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      user {
        id
        name
        email
        avatar
        role
        permissions
      }
      token
    }
  }
`

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS($cat: String!, $page: Int, $limit: Int) {
    products(cat: $cat, page: $page, limit: $limit) {
      paginator {
        pageCount
        prev
        perPage
        productCount
        currentPage
        next
        slNo
        hasPrevPage
        hasNextPage
      }
      products {
        id
        title
        unit
        price
        oldPrice
        inventory
        image
        seller {
          name
          email
        }
      }
    }
  }
`

// query GET_PRODUCT($id: ID!) {
//   getProduct(id: $id) {
//     id
//     title
//     unit
//     price
//     image
//     seller {
//       id
//       name
//       country
//     }
//   }
// }

// query GET_SELLERS {
//   sellers {
//     id
//     name
//     userType
//     country
//     billingAddress
//     shippingingAddress
//     sellerProducts {
//       id
//       title
//     }
//   }
// }

// query GET_USER($id: ID!) {
//   getUser(id: $id) {
//     id
//     name
//     userType
//     country
//     role
//     sellerProducts {
//       id
//       title
//     }
//   }
// }

// query GET_USERS {
//   users {
//     id
//     name
//     email
//     avatar
//     role
//     userType
//     billingAddress
//     shippingingAddress
//     country
//     permissions
//     sellerProducts {
//       id
//       title
//       unit
//       price
//       image
//     }
//   }
// }

// # Orders
// query GET_ORDERS {
//   orders(page: 1, limit: 10) {
//     paginator {
//       prev
//       next
//       slNo
//       perPage
//       hasPrevPage
//       hasNextPage
//       pageCount
//       currentPage
//       orderCount
//     }
//     orders {
//       buyer {
//         name
//         email
//       }
//       orderStatus
//       details {
//         productId
//         title
//         unit
//         price
//         sellerId
//         sellerName
//         image
//         itemStatus
//         quantity
//         shippedAt
//         fromAddress
//         toAddress
//         trackingNo
//       }
//     }
//   }
// }

// # by order status "InProcess", "Completed" or "Reviewed"
// query GET_ORDERS_BY_STATUS {
//   getOrdersByStatus(page: 1, limit: 10, orderStat: "") {
//     paginator {
//       prev
//       next
//       slNo
//       perPage
//       hasPrevPage
//       hasNextPage
//       pageCount
//       currentPage
//       orderCount
//     }
//     orders {
//       buyer {
//         name
//         email
//       }
//       orderStatus
//       details {
//         productId
//         title
//         unit
//         price
//         sellerId
//         sellerName
//         image
//         itemStatus
//         quantity
//         shippedAt
//         fromAddress
//         toAddress
//         trackingNo
//       }
//     }
//   }
// }

// # by order status "Pending", "Shipped", "Delivered" or "Canceled"
// query GET_ORDERED_PRODS_BY_STATUS {
//   orderedProductsByStatus(page: 1, limit: 10, itemStat: "Pending") {
//     paginator {
//       prev
//       next
//       slNo
//       perPage
//       hasPrevPage
//       hasNextPage
//       pageCount
//       currentPage
//       orderCount
//     }
//     orders {
//       buyer {
//         name
//         email
//       }
//       orderStatus
//       details {
//         productId
//         title
//         unit
//         price
//         sellerId
//         sellerName
//         image
//         itemStatus
//         quantity
//         shippedAt
//         fromAddress
//         toAddress
//         trackingNo
//       }
//     }
//   }
// }
