import { gql } from "@apollo/client"

export const CREATE_PRODUCT = gql`
  mutation CREATE_PRODUCT($newProduct: ProductInput) {
    createProduct(newProduct: $newProduct) {
      id
      title
      unit
      price
      image
      description {
        title
        detail
      }
      tags
      seller {
        id
        name
        email
        userType
      }
    }
  }
`

export const IMAGE_UPLOAD = gql`
  mutation ($file: Upload!) {
    imageUpload(file: $file) {
      filename
      mimetype
      url
    }
  }
`

export const REGISTER_USER = gql`
  mutation REGISTER_USER($newUser: UserInput) {
    register(newUser: $newUser) {
      user {
        id
        email
        name
        role
        permissions
        avatar
        shippingingAddress
        phone
        billingAddress
        country
      }
      token
    }
  }
`

export const CONFIRM_EMAIL = gql`
  mutation CONFIRM_EMAIL($newUser: UserInput!) {
    passCode(newUser: $newUser)
  }
`

export const ADD_CART_ITEM = gql`
  mutation ADD_CART_ITEM($newCart: CartInput) {
    addCartItem(newCart: $newCart) {
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
          seller {
            id
            name
          }
        }
        quantity
      }
    }
  }
`

export const UPDATE_CART_ITEM = gql`
  mutation UPDATE_CART_ITEM($updatedCartItem: CartInput) {
    updCartItem(updatedCartItem: $updatedCartItem) {
      id
      buyer {
        id
        name
      }
      items {
        product {
          id
          title
          unit
          price
          image
          seller {
            id
            name
          }
        }
        quantity
      }
    }
  }
`

// # product id
export const DEL_CART_ITEM = gql`
  mutation DEL_CART_ITEM($productId: ID!) {
    delCartItem(productId: $productId) {
      id
      message
      success
    }
  }
`

// orders
export const ADD_ORDER = gql`
  mutation ADD_ORDER($newOrder: [OrderInput]) {
    addOrder(newOrder: $newOrder) {
      id
      details {
        productId
        title
        unit
        price
        quantity
        image
        sellerId
        sellerName
        toAddress
        fromAddress
        itemStatus
        trackingNo
        shippedAt
      }
      buyer {
        name
        email
      }
      orderStatus
    }
  }
`

export const PROCESS_PAYMENT = gql`
  mutation ProcessPayment($token: String!, $total: Float) {
    processPayment(token: $token, total: $total)
  }
`

// {
//   "newOrder": [{
//     "productId":"619621d5fa36d2d13ef59a27",
//     "quantity": 2,
//     "unit": "kg",
//     "price": 10,
//     "image": "http",
//     "title": "Organic Salad",
//     "sellerId": "618776703dc2e3c7bc8386e1",
//     "sellerName": "Alexy Ayash"
//   },
//   {
//     "productId":"618847f07f3b726233f65f94",
//     "quantity": 2,
//     "unit": "kg",
//     "price": 10,
//     "image": "http",
//     "title": "Organic Oranges",
//     "sellerId": "6187769e3dc2e3c7bc8386e5",
//     "sellerName": "Ismat Ayash"
//   }]
// }

// {
//   "updCartItem": {
//     "quantity": 1,
//     "product": "61827d9fc257aeb988b70f1f"
//   },
//   "id": "6183d121020566685c2adc9c"
// }

// {
//   "updCartItem": {
//     "quantity": -1,
//     "product": "61827d9fc257aeb988b70f1f"
//   },
//   "id": "6183d121020566685c2adc9c"
// }

// {
//   "newCart": {
//     "quantity": 1,
//     "product": "61827d9fc257aeb988b70f1f"
//   }
// }

// {{
//   "newUser": {
//     "name": "Layale Bassil",
//     "email": "layale@gmail.com",
//     "password": "oam007",
//     "role":"seller",
//     "userType": "Seller",
//     "country":"Lebanon"
//     "avatar": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fismatayash%2F&psig=AOvVaw2V7bIlQw4m1vuexHebf9hV&ust=1635578262329000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjs_P2J7_MCFQAAAAAdAAAAABAD"
//   }
// }

// mutation UPDATE_PRODUCT($updatedProduct: ProductInput, $id: ID!){
//   editProductById(updatedProduct: $updatedProduct, id: $id){
//     title
//     unit
//     price
//     image
//     seller{
//       name
//       email
//     }
//   }
// }

// {
//   "updatedProduct": {
//     "title": "Boomali",
//     "unit": "piece",
//     "price": 8,
//     "image": "http updated",
//     "sellerId":"6180f837437242b185d3d5fd"
//   },
//   "id": "6181054f10e066018b430dbb"
// }

// mutation DELETE_PRODUCT($id: ID!){
//   delProductById(id: $id){
//     id
//     success
//     message
//   }
// }
// {
//   "id": "617a6e2a8c3fc88a1ad8e77c"
// }

// # product id
// mutation DEL_CART_ITEM($productId: ID!) {
//   delCartItem(productId: $productId) {
//     id
//     message
//     success
//   }
// }

// # cart id
// mutation DEL_CART($id: ID!){
//   delCart(id: $id){
//     id
//     message
//     success
//   }
// }

// mutation UPDATE_SHIPPMENT_INFO($id: ID!, $shipDet: ShipInput!) {
//   shipit(id: $id, shipDet: $shipDet) {
//     details {
//       toAddress
//       fromAddress
//       trackingNo
//       shippedAt
//       productId
//       sellerId
//       itemStatus
//     }
//     orderStatus
//   }
// }

// {
//   "shipDet": {
//     "productId": "619621d5fa36d2d13ef59a27",
//     "fromAddress": "Address from",
//     "toAddress": "Address to",
//     "trackingNo": "BEC123456",
//     "shippedAt": "11/11/2021",
//     "itemStatus": "Shipped",
//     "sellerId": "618776703dc2e3c7bc8386e1"
//   },
//   "id": "61976ecee0fd490789e5d80f"
// }

// mutation FORGOT_PASSWORD($id: ID!, $email: String!){
//   forgotPassword(id: $id, email: $email){
//     name
//     email
//     password
//   }
// }

// mutation CHANGE_PASSWORD($token: String!, $newPassword: String!){
//   changePassword(token: $token, newPassword: $newPassword){
//     name
//     email
//     billingAddress
//     id
//     shippingingAddress
//   }
// }
