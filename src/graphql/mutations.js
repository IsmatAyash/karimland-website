/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      title
      images
      quantity
      oldPrice
      orders
      avgRating
      ratings
      prodType
      featured
      prices
      description
      queryName
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      title
      images
      quantity
      oldPrice
      orders
      avgRating
      ratings
      prodType
      featured
      prices
      description
      queryName
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      title
      images
      quantity
      oldPrice
      orders
      avgRating
      ratings
      prodType
      featured
      prices
      description
      queryName
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
