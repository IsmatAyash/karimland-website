import React from "react"
import styled, { keyframes } from "styled-components"

const SubmitButton = ({ title, loading, onSubmit }) => {
  console.log("loading in SubmitButton", loading)
  return (
    <Button onSubmit={onSubmit}>
      {loading ? <Circle /> : <ButtonText>{title}</ButtonText>}
    </Button>
  )
}

const breatheAnimation = keyframes`
  80% {
    border: 2px solid transparent;
    border-left: 2px solid #932e3e;
  }
  100% {
    transform: rotate(1080deg);
    border: 2px solid #932e3e;
  }
`
const Circle = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid red;
  border-radius: 50%;
  animation-name: ${breatheAnimation};
  animation-duration: 8s;
  animation-iteration-count: infinite;
`
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 45px;
  min-width: 150px;

  &:hover {
    width: 170px;
    background-color: transparent;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.4);
    color: var(--grey-900);
  }
`

const ButtonText = styled.span`
  visibility: ${({ loading }) => (loading ? "hidden" : "visible")};
`

export default SubmitButton
