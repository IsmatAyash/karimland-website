/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
        status
        shippedto
        shippedfrom
        trackingNo
        shippedAt
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
      products {
        nextToken
      }
      createdAt
      updatedAt
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
        createdAt
        updatedAt
        customer
      }
      nextToken
    }
  }
`;
export const ordersByStatus = /* GraphQL */ `
  query OrdersByStatus(
    $status: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    OrdersByStatus(
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const ordersByUserAndDate = /* GraphQL */ `
  query OrdersByUserAndDate(
    $user: String
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    OrdersByUserAndDate(
      user: $user
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const ordersByDate = /* GraphQL */ `
  query OrdersByDate(
    $date: String
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    OrdersByDate(
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
