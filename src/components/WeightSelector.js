import React, { useState } from "react"
import styled from "styled-components"

const WeightSelector = ({ prices, setPrice }) => {
  const [select, setSelect] = useState(prices[0].wgt)

  const handleChange = e => {
    setPrice(e.target.value)
    setSelect(e.target.name)
  }
  return (
    <>
      {prices.length > 1 ? (
        <>
          Units:
          <WgtWrapper onChange={handleChange}>
            {prices.map(pp => (
              <>
                <input
                  type="radio"
                  value={pp.price}
                  name={pp.wgt}
                  checked={select === pp.wgt}
                />{" "}
                {pp.wgt}{" "}
              </>
            ))}
          </WgtWrapper>
        </>
      ) : (
        <div style={{ fontSize: "15px", marginBottom: "20px" }}>
          Unit: {prices[0].wgt}
        </div>
      )}
    </>
  )
}

const WgtWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  max-width: 190px;
  margin-bottom: 20px;
  padding-right: 5px;
  border: 0.5px solid var(--green-light);
  cursor: pointer;
  border-radius: 5px;

  @media screen and (min-width: 992px) {
    max-width: 210px;
    font-size: 14px;
  }
`

export default WeightSelector
