import React from "react"
import styled from "styled-components"
import { FaMinus, FaPlus } from "react-icons/fa"

const QuantitySelector = ({ qty, setQty, qtyInStock, unitPrice }) => {
  const onMinus = () => setQty(Math.max(0, qty - 1))
  const onPlus = () => setQty(Math.min(qtyInStock, qty + 1))

  return (
    <>
      Quantity:
      <QtyPrice>
        <QtyCtr>
          <QtyBtn onClick={onMinus}>
            <FaMinus />
          </QtyBtn>
          <Quantity>{qty}</Quantity>
          <QtyBtn onClick={onPlus}>
            <FaPlus />
          </QtyBtn>
        </QtyCtr>
        <PriceCtr>Price: KD {(qty * unitPrice).toFixed(2)}</PriceCtr>
      </QtyPrice>
    </>
  )
}

const QtyPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
`

const QtyCtr = styled.div`
  flex: 2;
  display: flex;
  flex-direction: row;
  border: 1px solid lightgrey;
  border-radius: 25;
  max-width: 150px;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--borderRadius);
`
const QtyBtn = styled.button`
  background-color: grey;
`

const Quantity = styled.span`
  font-size: 15px;
  text-align: center;
`

const PriceCtr = styled.div`
  font-size: 16px;
  font-weight: bolder;
`

export default QuantitySelector
