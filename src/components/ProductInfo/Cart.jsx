import React, { useContext, useState } from "react"
import { CartContext } from "../../context/carts"
import { MdClose, MdAdd, MdRemove, MdDeleteForever } from "react-icons/md"
import { Link } from "gatsby"
import styled from "styled-components"
import { UserContext } from "../../context/users"

const Cart = ({ closeCart }) => {
  const { user } = useContext(UserContext)
  const [reverse, setReverse] = useState(false)
  const { cart, total, updCartItem, delCartItem } = useContext(CartContext)

  const onClose = () => {
    setReverse(true)
    setTimeout(() => {
      closeCart(false)
      setReverse(false)
    }, 450)
  }

  return (
    <Backdrop className={"backdrop " + (reverse ? "reverse" : "")}>
      <ModalContent className={"modal " + (reverse ? "reverse" : "")}>
        <div className="modal-header">
          <span className="close">My Cart ({cart?.items.length || 0})</span>
          <MdClose className="close" onClick={onClose} />
        </div>
        <div className="modal-body">
          <div className="cart-wrapper">
            {cart &&
              cart.items.map(
                ({ product: { id, image, title, price }, quantity }) => (
                  <article key={id} className="cart-item">
                    <div className="image">
                      <img src={image} alt="cart item" />
                    </div>
                    <div className="details">
                      <DetailLine>
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
                            delCartItem(id, user.user.id)
                          }
                        />
                      </DetailLine>
                      <DetailLine>$ {price}</DetailLine>
                      <div className="amount">
                        <div className="cart-qty">
                          <button
                            onClick={() =>
                              updCartItem(
                                { quantity: -1, product: id },
                                user.user.id
                              )
                            }
                          >
                            <MdRemove />
                          </button>
                          <DetailLine
                            style={{
                              minWidth: "2rem",
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            {quantity}
                          </DetailLine>
                          {/* <button onClick={() => decreaseAmount(id, quantity)}> */}
                          <button
                            onClick={() =>
                              updCartItem(
                                { quantity: 1, product: id },
                                user.user.id
                              )
                            }
                          >
                            <MdAdd />
                          </button>
                        </div>
                        <DetailLine style={{ fontWeight: "bold" }}>
                          Total: KD {(price * quantity).toFixed(2)}
                        </DetailLine>
                      </div>
                    </div>
                  </article>
                )
              )}
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
            to={user ? "/checkout" : "/signin"}
            state={{ fromCheckout: true }}
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

const DetailLine = styled.span`
  color: var(--grey-900);
`

export default Cart
