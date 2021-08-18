import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import styled from "styled-components"

const ProductDetails = ({ description }) => {
  const [key, setKey] = useState("description")
  return (
    <Tabs activeKey={key} onSelect={k => setKey(k)} className="mt-5 mb-2">
      <Tab eventKey="description" title="Product Description">
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
      </Tab>
      <Tab eventKey="policy" title="Return Policy">
        <PolicyCtr>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </PolicyCtr>
      </Tab>
      <Tab eventKey="reviews" title="Customer Reviews">
        <article>
          <form className="form contact-form">
            <div className="form-row">
              <label htmlFor="name">Your name</label>
              <input type="text" name="name" id="name"></input>
            </div>
            <div className="form-row">
              <label htmlFor="name">Your email</label>
              <input type="email" name="email" id="email"></input>
            </div>
            <div className="form-row">
              <label htmlFor="message">message</label>
              <textarea name="message" id="message"></textarea>
            </div>
            <button type="submit" className="btn block btn-bgfg-colors">
              Submit
            </button>
          </form>
        </article>
      </Tab>
    </Tabs>
  )
}

const PolicyCtr = styled.div`
  background-color: aliceblue;
  padding: 1em;
  margin-bottom: 0.4em;
  font-size: 14px;
`

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
export default ProductDetails
