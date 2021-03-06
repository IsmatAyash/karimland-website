import React from "react"
import styled from "styled-components"

const ErrorMessage = ({ children }) => {
  return (
    <ErrMessage role="alert">
      <svg width="16" height="16" viewBox="0 0 17 17">
        <path
          fill="var(--primary-700)"
          d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
        />
        <path
          fill="var(--white)"
          d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
        />
      </svg>
      {children}
    </ErrMessage>
  )
}

const ErrMessage = styled.div`
  color: var(--grey-1000);
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.9rem;
  margin-left: 0.7rem;
  width: 100%;
  animation: fade 150ms ease-out;
  animation-delay: 50ms;
  animation-fill-mode: forwards;
  will-change: opacity, transform;

  & svg {
    margin-right: 10px;
  }
`

export default ErrorMessage
