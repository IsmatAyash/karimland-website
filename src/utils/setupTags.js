const setupTags = products => {
  const allTags = {}

  products.forEach(product => {
    product.tags.forEach(tag => {
      if (allTags[tag]) allTags[tag] = allTags[tag] + 1
      else allTags[tag] = 1
    })
  })
  // changes object to array and sort array alphabatic
  const newTags = Object.entries(allTags).sort((a, b) => {
    const [firstTag] = a
    const [secondTag] = b
    return firstTag.localeCompare(secondTag)
  })
  return newTags
}

export default setupTags
