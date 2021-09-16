import React, { useState } from "react"
import RatingStars from "../RatingStars"
import UserReview from "./UserReview"
import { Rating, RatingView } from "react-simple-star-rating"

const data = [
  {
    userId: 1,
    country: "Kuwait",
    createdAt: "Sep 12, 2021 15:00",
    userName: "Ismat Ayash",
    ratings: 4.2,
    productName: "Organic Potatoes",
    comment: "Any text goes here writing details about experience",
  },
  {
    userId: 2,
    country: "Lebanon",
    createdAt: "Sep 12, 2021 15:00",
    userName: "Layale Ayash",
    ratings: 3.8,
    productName: "Organic Potatoes",
    comment: "Any text goes here writing details about experience",
  },
  {
    userId: 3,
    country: "Bangladish",
    createdAt: "Sep 12, 2021 15:00",
    userName: "Alexy Bassil",
    ratings: 2.5,
    productName: "Organic Potatoes",
    comment: "Any text goes here writing details about experience",
  },
  {
    userId: 4,
    country: "Canada",
    createdAt: "Sep 12, 2021 15:00",
    userName: "Andrew Fares",
    ratings: 4.5,
    productName: "Organic Potatoes",
    comment: "Any text goes here writing details about experience",
  },
]

const Reviews = () => {
  const [rating, setRating] = useState(0)

  const avgRatings = data.reduce((s, a) => (s += a.ratings), 0) / data.length

  const handleRating = rate => {
    setRating(rate)
    // Some logic
  }

  return (
    <div>
      <RatingStars avgRating={avgRatings} ratings={data.length} basedOn />
      <article>
        <form className="form contact-form">
          <div className="form-field">
            <label htmlFor="name">Your name</label>
            <input type="text" name="name" id="name"></input>
          </div>
          <div className="form-field">
            <label htmlFor="email">Your email</label>
            <input type="email" name="email" id="email"></input>
          </div>
          <div className="form-field">
            <label htmlFor="rate">Ratings</label>
            <Rating
              onClick={handleRating}
              ratingValue={rating}
              name="rate"
              id="rate"
            />
          </div>
          <div className="form-field">
            <label htmlFor="message">message</label>
            <textarea name="message" id="message"></textarea>
          </div>
          <button type="submit" className="btn block btn-bgfg-colors">
            Submit
          </button>
        </form>
      </article>
      {data.map(userReview => (
        <UserReview key={userReview.userId} userReview={userReview} />
      ))}
    </div>
  )
}

export default Reviews
