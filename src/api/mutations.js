/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      seller_id
      title
      image
      inventory
      price
      unit
      oldPrice
      avgRating
      ratings
      category
      featured
      description
      tags
      baseType
      orders {
        nextToken
      }
      carts {
        nextToken
      }
      createdAt
      updatedAt
      seller {
        id
        name
        address
        country
        createdAt
        updatedAt
      }
    }
  }
`
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      seller_id
      title
      image
      inventory
      price
      unit
      oldPrice
      avgRating
      ratings
      category
      featured
      description
      tags
      baseType
      orders {
        nextToken
      }
      carts {
        nextToken
      }
      createdAt
      updatedAt
      seller {
        id
        name
        address
        country
        createdAt
        updatedAt
      }
    }
  }
`
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      seller_id
      title
      image
      inventory
      price
      unit
      oldPrice
      avgRating
      ratings
      category
      featured
      description
      tags
      baseType
      orders {
        nextToken
      }
      carts {
        nextToken
      }
      createdAt
      updatedAt
      seller {
        id
        name
        address
        country
        createdAt
        updatedAt
      }
    }
  }
`
export const createSeller = /* GraphQL */ `
  mutation CreateSeller(
    $input: CreateSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    createSeller(input: $input, condition: $condition) {
      id
      name
      address
      country
      createdAt
      updatedAt
      products {
        nextToken
      }
    }
  }
`
export const updateSeller = /* GraphQL */ `
  mutation UpdateSeller(
    $input: UpdateSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    updateSeller(input: $input, condition: $condition) {
      id
      name
      address
      country
      createdAt
      updatedAt
      products {
        nextToken
      }
    }
  }
`
export const deleteSeller = /* GraphQL */ `
  mutation DeleteSeller(
    $input: DeleteSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    deleteSeller(input: $input, condition: $condition) {
      id
      name
      address
      country
      createdAt
      updatedAt
      products {
        nextToken
      }
    }
  }
`
export const createProductOrder = /* GraphQL */ `
  mutation CreateProductOrder(
    $input: CreateProductOrderInput!
    $condition: ModelProductOrderConditionInput
  ) {
    createProductOrder(input: $input, condition: $condition) {
      id
      product_id
      order_id
      order {
        id
        user
        date
        total
        status
        shippedto
        shippedfrom
        trackingNo
        shippedAt
        createdAt
        updatedAt
        customer
      }
      createdAt
      updatedAt
      product {
        id
        seller_id
        title
        image
        inventory
        price
        unit
        oldPrice
        avgRating
        ratings
        category
        featured
        description
        tags
        baseType
        createdAt
        updatedAt
      }
      customer
    }
  }
`
export const updateProductOrder = /* GraphQL */ `
  mutation UpdateProductOrder(
    $input: UpdateProductOrderInput!
    $condition: ModelProductOrderConditionInput
  ) {
    updateProductOrder(input: $input, condition: $condition) {
      id
      product_id
      order_id
      order {
        id
        user
        date
        total
        status
        shippedto
        shippedfrom
        trackingNo
        shippedAt
        createdAt
        updatedAt
        customer
      }
      createdAt
      updatedAt
      product {
        id
        seller_id
        title
        image
        inventory
        price
        unit
        oldPrice
        avgRating
        ratings
        category
        featured
        description
        tags
        baseType
        createdAt
        updatedAt
      }
      customer
    }
  }
`
export const deleteProductOrder = /* GraphQL */ `
  mutation DeleteProductOrder(
    $input: DeleteProductOrderInput!
    $condition: ModelProductOrderConditionInput
  ) {
    deleteProductOrder(input: $input, condition: $condition) {
      id
      product_id
      order_id
      order {
        id
        user
        date
        total
        status
        shippedto
        shippedfrom
        trackingNo
        shippedAt
        createdAt
        updatedAt
        customer
      }
      createdAt
      updatedAt
      product {
        id
        seller_id
        title
        image
        inventory
        price
        unit
        oldPrice
        avgRating
        ratings
        category
        featured
        description
        tags
        baseType
        createdAt
        updatedAt
      }
      customer
    }
  }
`
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      user
      date
      total
      status
      shippedto
      shippedfrom
      trackingNo
      shippedAt
      products {
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      user
      date
      total
      status
      shippedto
      shippedfrom
      trackingNo
      shippedAt
      products {
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      user
      date
      total
      status
      shippedto
      shippedfrom
      trackingNo
      shippedAt
      products {
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`
export const createProductCart = /* GraphQL */ `
  mutation CreateProductCart(
    $input: CreateProductCartInput!
    $condition: ModelProductCartConditionInput
  ) {
    createProductCart(input: $input, condition: $condition) {
      id
      product_id
      user_id
      quantity
      cart {
        id
        createdAt
        updatedAt
        customer
      }
      createdAt
      updatedAt
      product {
        id
        seller_id
        title
        image
        inventory
        price
        unit
        oldPrice
        avgRating
        ratings
        category
        featured
        description
        tags
        baseType
        createdAt
        updatedAt
      }
      customer
    }
  }
`
export const updateProductCart = /* GraphQL */ `
  mutation UpdateProductCart(
    $input: UpdateProductCartInput!
    $condition: ModelProductCartConditionInput
  ) {
    updateProductCart(input: $input, condition: $condition) {
      id
      product_id
      user_id
      quantity
      cart {
        id
        createdAt
        updatedAt
        customer
      }
      createdAt
      updatedAt
      product {
        id
        seller_id
        title
        image
        inventory
        price
        unit
        oldPrice
        avgRating
        ratings
        category
        featured
        description
        tags
        baseType
        createdAt
        updatedAt
      }
      customer
    }
  }
`
export const deleteProductCart = /* GraphQL */ `
  mutation DeleteProductCart(
    $input: DeleteProductCartInput!
    $condition: ModelProductCartConditionInput
  ) {
    deleteProductCart(input: $input, condition: $condition) {
      id
      product_id
      user_id
      quantity
      cart {
        id
        createdAt
        updatedAt
        customer
      }
      createdAt
      updatedAt
      product {
        id
        seller_id
        title
        image
        inventory
        price
        unit
        oldPrice
        avgRating
        ratings
        category
        featured
        description
        tags
        baseType
        createdAt
        updatedAt
      }
      customer
    }
  }
`
export const createCart = /* GraphQL */ `
  mutation CreateCart(
    $input: CreateCartInput!
    $condition: ModelCartConditionInput
  ) {
    createCart(input: $input, condition: $condition) {
      id
      products {
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`
export const updateCart = /* GraphQL */ `
  mutation UpdateCart(
    $input: UpdateCartInput!
    $condition: ModelCartConditionInput
  ) {
    updateCart(input: $input, condition: $condition) {
      id
      products {
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`
export const deleteCart = /* GraphQL */ `
  mutation DeleteCart(
    $input: DeleteCartInput!
    $condition: ModelCartConditionInput
  ) {
    deleteCart(input: $input, condition: $condition) {
      id
      products {
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`
