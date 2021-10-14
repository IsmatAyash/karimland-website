import styled, { keyframes } from "styled-components"
import { CardElement } from "@stripe/react-stripe-js"

export const Fieldset = styled.fieldset`
  padding: 0;
  border-style: none;
  background-color: transparent;
  will-change: opacity, transform;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #829fff;
  border-radius: 4px;
  margin-bottom: 10px;
`
export const Form = styled.form`
  animation: fade 200ms ease-out;
`

export const fade = keyframes`
 from {
    opacity: 0;
    transform: scale3D(0.95, 0.95, 0.95);
  }
  to {
    opacity: 1;
    transform: scale3D(1, 1, 1);
  }
`

export const FormRow = styled.div`
  display: -ms-flexbox;
  /* display: flex; */
  flex-direction: column;
  -ms-flex-align: center;
  /* align-items: center; */
  margin-left: 5px;
  border: 1px solid var(--grey-100);
  border-radius: 4px;
  margin: 0.5rem;
  background-color: #fff;

  &:first-child {
    border-top: none;
  }
`

export const FormRowLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  min-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`

export const FormRowInput = styled.input`
  font-size: 14px;
  width: 100%;
  /* padding: 11px 15px 11px 0; */
  color: var(--grey-900);
  background-color: transparent;
  animation: 1ms VoidAnimationOut;
  padding: 0;
  border-style: none;

  &::placeholder {
    color: var(--grey-800);
  }
`

// const VoidAnimationOut = keyframes`
//     0%,
//     to {opacity: 1;}
// `

export const StripeElement = styled(CardElement)`
  width: 100%;
  padding: 11px 15px 11px 0;

  &-webkit-autofill {
    background: transparent !important;
  }
`

export const Result = styled.div`
  margin-top: 50px;
  text-align: center;
  animation: fade 200ms ease-out;
`

export const ResultTitle = styled.div`
  color: #fff;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 17px;
  text-align: center;
`

export const ResultMessage = styled.div`
  color: #9cdbff;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 25px;
  line-height: 1.6em;
  text-align: center;
`
