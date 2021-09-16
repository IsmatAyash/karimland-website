import React from "react"
import styled from "styled-components"
import { stars } from "../utils/reviewStars"

const RatingStars = ({ avgRating, ratings, basedOn }) => {
  return (
    <StarsContainer>
      {Array(5)
        .fill()
        .map((_, i) => (
          <div key={i}>{stars(i, avgRating)}</div>
        ))}
      {basedOn ? <span>Based on-</span> : ""}{" "}
      {ratings && `- ${ratings} reviews`}
    </StarsContainer>
  )
}

const StarsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`

export default RatingStars
