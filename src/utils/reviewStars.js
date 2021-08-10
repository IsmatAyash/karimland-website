import React from "react"
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa"

export const stars = (idx, avgRating) => {
  const fraction = avgRating - Math.floor(avgRating)
  if (idx < Math.trunc(avgRating))
    return <FaStar style={{ color: "#d7b740", marginRight: 4 }} />
  if (fraction !== 0 && idx === Math.trunc(avgRating))
    return <FaStarHalf style={{ color: "#d7b740", marginRight: 4 }} />
  return <FaRegStar style={{ color: "#d7b740", marginRight: 4 }} />
}
