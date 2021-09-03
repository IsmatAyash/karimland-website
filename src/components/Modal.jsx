import React, { useContext, useState } from "react"
import { CartContext } from "../context/carts"
import { MdClose, MdAdd, MdRemove, MdDeleteForever } from "react-icons/md"
import { Link } from "gatsby"
import styled from "styled-components"

const Modal = ({ closeModal }) => {
  const [reverse, setReverse] = useState(false)
  const { cart, total, increaseAmount, decreaseAmount, delFromCart } =
    useContext(CartContext)

  const onClose = () => {
    setReverse(true)
    setTimeout(() => {
      closeModal(false)
      setReverse(false)
    }, 450)
  }

  return (
    <Backdrop className={"backdrop " + (reverse ? "reverse" : "")}>
      <ModalContent className={"modal " + (reverse ? "reverse" : "")}>
        <div className="modal-header">
          <span className="close">My Cart ({cart.length || 0})</span>
          <MdClose className="close" onClick={onClose} />
        </div>
        <div className="modal-body">
          <div className="cart-wrapper">
            {cart.map(({ id, title, price, image, amount }) => (
              <article key={id} className="cart-item">
                <div className="image">
                  <img src={image} alt="cart item" />
                </div>
                <div className="details">
                  <span>
                    {title}
                    <MdDeleteForever
                      style={{
                        float: "right",
                        color: "var(--grey-700)",
                        fontSize: "1.7rem",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        window.confirm("Sure to delete cart item?") &&
                        delFromCart(id)
                      }
                    />
                  </span>
                  <span>$ {price}</span>
                  <div className="amount">
                    <div className="cart-qty">
                      <button onClick={() => decreaseAmount(id, amount)}>
                        <MdRemove />
                      </button>
                      <span
                        style={{
                          minWidth: "2rem",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {amount}
                      </span>
                      <button onClick={() => increaseAmount(id)}>
                        <MdAdd />
                      </button>
                    </div>
                    <span style={{ fontWeight: "bold" }}>
                      Total: KD {(price * amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <div className="cart-total">
            <span>SubTotal :</span>
            <span
              style={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              KD {total}
            </span>
          </div>
          <Link
            to="/checkout"
            className="btn btn-bgfg-colors small"
            style={{ width: "100%", textAlign: "center" }}
          >
            Checkout
          </Link>
          <Link
            style={{ fontStyle: "italic", fontSize: 16, marginTop: 5 }}
            to="/"
          >
            Continue Shopping
          </Link>
        </div>
      </ModalContent>
    </Backdrop>
  )
}

const Backdrop = styled.div`
  position: fixed;
  z-index: 100;
  padding-top: 40px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 50px;
  overflow: auto;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: var(--white);
  padding: 0;
  border: 1px solid var(--grey-400);
  width: 70%;
  height: 100vh;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  top: 0;
  right: 0;

  @media screen and (min-width: 992px) {
    width: 40%;
  }
`

export default Modal
