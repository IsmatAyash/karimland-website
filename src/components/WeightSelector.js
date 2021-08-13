import React, { useState } from "react"
import {
  ButtonGroup,
  ToggleButton,
  ButtonToolbar,
  Button,
} from "react-bootstrap"
import styled from "styled-components"

const WeightSelector = ({ prices, setPrice }) => {
  const [select, setSelect] = useState(prices[0].wgt)
  const [checked, setChecked] = useState(false)
  const [radioValue, setRadioValue] = useState("1")

  const radios = [
    { name: "Active", value: "1" },
    { name: "Radio", value: "2" },
    { name: "Radio", value: "3" },
  ]

  const handleChange = e => {
    setPrice(e.currentTarget.value)
    setSelect(e.currentTarget.name)
  }

  return (
    <>
      {prices.length > 1 ? (
        <div style={{ marginTop: "20px" }}>
          Units:
          <WgtWrapper>
            <ButtonGroup size="sm">
              {prices.map((pp, idx) => (
                <ToggleButton
                  key={idx}
                  id={`wgt-${idx}`}
                  type="radio"
                  variant="outline-success"
                  name={pp.wgt}
                  value={pp.price}
                  checked={select === pp.wgt}
                  onChange={e => handleChange(e)}
                >
                  {pp.wgt}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </WgtWrapper>
        </div>
      ) : (
        <div style={{ fontSize: "15px", marginBottom: "20px" }}>
          Unit: {prices[0].wgt}
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
