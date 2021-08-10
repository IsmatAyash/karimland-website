import React from "react"
import styled from "styled-components"
import { FaMinus, FaPlus } from "react-icons/fa"

const QuantitySelector = ({ qtywgt, setQtywgt, qtyInStock }) => {
  const onMinus = () => setQtywgt(Math.max(0, qtywgt - 1))
  const onPlus = () => setQtywgt(Math.min(qtyInStock, qtywgt + 1))

  return (
    <>
      Quantity:
      <QtyCtr>
        <QtyBtn onClick={onMinus}>
          <FaMinus />
        </QtyBtn>
        <Quantity>{qtywgt}</Quantity>
        <QtyBtn onClick={onPlus}>
          <FaPlus />
        </QtyBtn>
      </QtyCtr>
    </>
  )
}

const QtyCtr = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid lightgrey;
  border-radius: 25;
  max-width: 200px;
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

//   quantity: {
//     fontSize: 15,
//     minWidth: 30,
//     textAlign: "center",
//   },
//   unit: {
//     minWidth: 20,
//     padding: 5,
//     borderColor: colors.medium,
//     fontWeight: "500",
//     fontSize: 14,
//   },
//   weight: {
//     padding: 0,
//     borderWidth: 0.5,
//     borderRadius: 15,
//     borderColor: colors.lime,
//     fontSize: 15,
//     minWidth: 80,
//     textAlign: "center",
//   },
//   price: {
//     fontWeight: "bold",
//     paddingHorizontal: 80,
//   },

export default QuantitySelector
