/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      user
      date
      total
      products {
        nextToken
      }
      createdAt
      updatedAt
      customer
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        date
        total
        createdAt
        updatedAt
        customer
      }
      nextToken
    }
  }
`;
export const getCart = /* GraphQL */ `
  query GetCart($id: ID!) {
    getCart(id: $id) {
      id
      total
      createdAt
      updatedAt
      products {
        nextToken
      }
      customer
    }
  }
`;
export const listCarts = /* GraphQL */ `
  query ListCarts(
    $filter: ModelCartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        total
        createdAt
        updatedAt
        customer
      }
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      seller_id
      user_id
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
      cart {
        id
        total
        createdAt
        updatedAt
        customer
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
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        seller_id
        user_id
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
      nextToken
    }
  }
`;
export const productsByPrice = /* GraphQL */ `
  query ProductsByPrice(
    $baseType: String
    $price: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ProductsByPrice(
      baseType: $baseType
      price: $price
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        seller_id
        user_id
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
      nextToken
    }
  }
`;
export const productsByTitle = /* GraphQL */ `
  query ProductsByTitle(
    $baseType: String
    $title: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ProductsByTitle(
      baseType: $baseType
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        seller_id
        user_id
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
      nextToken
    }
  }
`;
export const productsByCategory = /* GraphQL */ `
  query ProductsByCategory(
    $baseType: String
    $category: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ProductsByCategory(
      baseType: $baseType
      category: $category
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        seller_id
        user_id
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
      nextToken
    }
  }
`;
export const productsByInventory = /* GraphQL */ `
  query ProductsByInventory(
    $baseType: String
    $inventory: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByInventory(
      baseType: $baseType
      inventory: $inventory
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        seller_id
        user_id
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
      nextToken
    }
  }
`;
export const getSeller = /* GraphQL */ `
  query GetSeller($id: ID!) {
    getSeller(id: $id) {
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
`;
export const listSellers = /* GraphQL */ `
  query ListSellers(
    $filter: ModelSellerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSellers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        address
        country
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
