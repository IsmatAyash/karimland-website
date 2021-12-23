import React, { useState } from "react"
import styled from "styled-components"

import Reviews from "../Reviews"

const MyTabs = ({ description }) => {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div className="tabs">
      <input
        type="radio"
        name="tabgroup"
        id="description"
        value="description"
        checked={activeTab === "description"}
        onChange={e => setActiveTab(e.target.value)}
      />
      <label htmlFor="description">Product Description</label>
      <div className="tab">
        <h4>Product details</h4>
        <DescriptionCtr>
          {description.map((item, idx) => {
            const { title, detail } = item
            return (
              <DescriptionLine key={idx}>
                <DescriptionHeader>{title}:</DescriptionHeader>
                {detail}
              </DescriptionLine>
            )
          })}
        </DescriptionCtr>
      </div>
      <input
        type="radio"
        name="tabgroup"
        id="policy"
        value="policy"
        checked={activeTab === "policy"}
        onChange={e => setActiveTab(e.target.value)}
      />
      <label htmlFor="policy">Returned Policy</label>
      <div className="tab">
        <h4>Returned Policy</h4>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>
      <input
        type="radio"
        name="tabgroup"
        id="reviews"
        value="reviews"
        checked={activeTab === "reviews"}
        onChange={e => setActiveTab(e.target.value)}
      />
      <label htmlFor="reviews">Customer Reviews</label>
      <div className="tab">
        <h4>Write a Review</h4>
        <Reviews />
      </div>
    </div>
  )
}

const DescriptionCtr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 14px;
`

const DescriptionLine = styled.div`
  margin-bottom: 10px;
`
const DescriptionHeader = styled.span`
  font-weight: bold;
  margin-right: 5px;
`

export default MyTabs
