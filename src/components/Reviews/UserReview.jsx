import React from "react"
import RatingStars from "./RatingStars"
import styled from "styled-components"

const UserReview = ({ userReview }) => {
  const { userName, comment, ratings, createdAt } = userReview
  return (
    <Widget>
      <RatingStars avgRating={ratings} />
      <UserName>
        {userName} on {createdAt}
      </UserName>
      <Comment>{comment}</Comment>
    </Widget>
  )
}

const Widget = styled.div`
  flex: 1;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
`

const UserName = styled.small`
  color: var(--grey-700);
`

const Comment = styled.p`
  font-size: 0.8rem;
`

export default UserReview
