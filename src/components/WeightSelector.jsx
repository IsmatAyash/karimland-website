import React, { useState } from "react"

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
          <div className="form-field form-field-flex1">
            <label style={{ fontSize: 14 }} htmlFor="prodType">
              Units
            </label>
            <div className="form-radio">
              {prices.map((pp, idx) => {
                const { weight, price } = JSON.parse(pp)
                return (
                  <>
                    <input
                      className="radio-input"
                      type="radio"
                      value={price}
                      name={weight}
                      id={`radio${idx}`}
                      checked={unit === weight}
                      onChange={e => handleChange(e)}
                    />
                    <label className="radio-label" htmlFor={`radio${idx}`}>
                      {weight}
                    </label>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ fontSize: "15px", marginBottom: "20px" }}>
          Unit: {JSON.parse(prices[0]).weight}
        </div>
      )}
    </>
  )
}

export default WeightSelector
