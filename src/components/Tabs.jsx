import React from "react"
import styled from "styled-components"

const MyTabs = ({ description }) => {
  return (
    <div className="tabs">
      <input type="radio" name="tabgroup" id="description" />
      <label htmlFor="description">Product Description</label>
      <div className="tab">
        <h4>Product details</h4>
        <DescriptionCtr>
          {description.map((item, idx) => {
            const { header, detail } = JSON.parse(item)
            return (
              <DescriptionLine key={idx}>
                <DescriptionHeader>{header}:</DescriptionHeader>
                {detail}
              </DescriptionLine>
            )
          })}
        </DescriptionCtr>
      </div>
      <input type="radio" name="tabgroup" id="policy" />
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
      <input type="radio" name="tabgroup" id="reviews" />
      <label htmlFor="reviews">Customer Reviews</label>
      <div className="tab">
        <h4>Customer Reviews</h4>
        <article>
          <form className="form contact-form">
            <div className="form-field">
              <label htmlFor="name">Your name</label>
              <input type="text" name="name" id="name"></input>
            </div>
            <div className="form-field">
              <label htmlFor="name">Your email</label>
              <input type="email" name="email" id="email"></input>
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
