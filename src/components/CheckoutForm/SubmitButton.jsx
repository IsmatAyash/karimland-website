import React from "react"
import styled, { keyframes } from "styled-components"
import { FaCheckCircle } from "react-icons/fa"

const SubmitButton = ({ processing, error, children, disabled, success }) => {
  return (
    <Button
      error={error}
      type="submit"
      disabled={processing || success || disabled}
    >
      {processing ? (
        <Circle />
      ) : success ? (
        <FaCheckCircle style={{ fontSize: "25px" }} className="react-icons" />
      ) : (
        children
      )}
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: calc(100% - 30px);
  height: 2.5rem;
  margin: 40px 15px 0;
  background-color: var(--green-light);
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #ffb9f6;
  border-radius: 4px;
  color: var(--grey-100);
  font-weight: 600;
  cursor: pointer;
  transition: all 100ms ease-in-out;
  will-change: transform, background-color, box-shadow;
  transform: ${({ error }) => (error ? "translateY(15px)" : "")};

  & :hover {
    background-color: var(--green-dark);
    box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 green;
    transform: scale(0.99);
  }

  /* &:active {
    background-color: rgba(0, 128, 0, 0.625);
    box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 green;
    transform: scale(0.99);
  } */

  &:disabled {
    opacity: 0.5;
    cursor: default;
    background-color: var(--green-light);
    box-shadow: none;
    cursor: not-allowed;
  }
`
const spin = keyframes`
  80% {
    border: 2px solid transparent;
    border-left: 2px solid var(--grey-100);
  }
  100% {
    transform: rotate(1080deg);
    border: 2px solid var(--grey-100);
  }
`

export const Circle = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border: 2px solid var(--white);
  border-radius: 50%;
  animation-name: ${spin};
  animation-duration: 4s;
  animation-iteration-count: infinite;
`

export default SubmitButton
