export const flatten = (obj = {}) =>
  Object.keys(obj || {}).reduce((acc, cur) => {
    if (typeof obj[cur] === "object") {
      acc = { ...acc, ...flatten(obj[cur]) }
    } else {
      acc[cur] = obj[cur]
    }
    return acc
  }, {})
