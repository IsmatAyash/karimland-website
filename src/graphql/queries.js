import { gql } from "@apollo/client"
import QuantitySelector from "../components/ProductInfo/QuantitySelector"
import { Rating } from "react-simple-star-rating"

export const AUTH_USER = gql`
  query AUTH_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
        avatar
        role
        permissions
        userType
        country
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
        tags
        seller {
          name
          email
        }
      }
    }
  }
`

export const GET_TAGS = gql`
  query GET_TAGS {
    tags {
      id
      tags
    }
  }
`

export const GET_PRODUCTS_TAG = gql`
  query GET_PRODUCTS_TAG($tag: String!) {
    productsTag(tag: $tag) {
      id
      title
      inventory
      image
      price
      unit
      oldPrice
      rating
    }
  }
`
export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    getProduct(id: $id) {
      id
      title
      unit
      price
      oldPrice
      rating
      avgRating
      image
      inventory
      description {
        title
        detail
      }
      seller {
        id
        name
        country
      }
    }
  }
`
export const GET_CART = gql`
  query GET_CART($buyer: ID!) {
    getCart(buyer: $buyer) {
      id
      buyer {
        id
        name
        email
      }
      items {
        product {
          id
          title
          unit
          price
          image
        }
        quantity
      }
    }
  }
`

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
