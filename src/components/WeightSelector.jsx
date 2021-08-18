import React, { useState } from "react"
import { ButtonGroup, ToggleButton } from "react-bootstrap"
import styled from "styled-components"

const WeightSelector = ({ prices, setUnitPrice }) => {
  const [unit, setUnit] = useState(JSON.parse(prices[0]).weight)

  const handleChange = e => {
    setUnitPrice(e.currentTarget.value)
    setUnit(e.currentTarget.name)
  }

  return (
    <>
      {prices.length > 1 ? (
        <div style={{ marginTop: "20px" }}>
          Units:
          <WgtWrapper>
            <ButtonGroup>
              {prices.map((pp, idx) => {
                const { weight, price } = JSON.parse(pp)
                return (
                  <ToggleButton
                    key={idx}
                    id={`weight-${idx}`}
                    type="radio"
                    variant="outline-success"
                    name={weight}
                    value={price}
                    checked={unit === weight}
                    onChange={e => handleChange(e)}
                  >
                    {weight}
                  </ToggleButton>
                )
              })}
            </ButtonGroup>
          </WgtWrapper>
        </div>
      ) : (
        <div style={{ fontSize: "15px", marginBottom: "20px" }}>
          Unit: {JSON.parse(prices[0]).weight}
        </div>
      )}
    </>
  )
}

const WgtWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  padding-right: 5px;

  @media screen and (min-width: 992px) {
    font-size: 12px;
  }
`

export default WeightSelector
