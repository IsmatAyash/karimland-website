import React, { useState, useEffect, useContext } from "react"
import Layout from "../components/Layout"
import { UserContext } from "../context/users"
import { navigate } from "gatsby"
import styled, { keyframes } from "styled-components"
import { REGISTER_USER, CONFIRM_EMAIL } from "../graphql/mutations"
import { AUTH_USER } from "../graphql/queries"
import { useMutation, useLazyQuery } from "@apollo/client"
import { inputErrHandler } from "../utils/errorHandlers"
import Svg from "../components/common/Svg"

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "buyer",
  userType: "Buyer",
  country: "",
  avatar: "",
}

const Signin = props => {
  const { user, updateUser } = useContext(UserContext)
  const [formType, setFormType] = useState("signIn")
  const [userState, setUserState] = useState(initialState)
  const [enteredPassCode, setEnteredPassCode] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [validationErrs, setValidationErrs] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [authUser] = useLazyQuery(AUTH_USER)

  const [regUser] = useMutation(REGISTER_USER, {
    fetchPolicy: "network-only",
    onCompleted: data => {
      setFormType("signedIn")
      setIsSubmitting(false)
      updateUser({
        user: data.register?.user,
        token: data.register?.token,
      })
      navigate("/")
      localStorage.setItem("token", data.register?.token)
    },
  })

  const [genPassCode] = useMutation(CONFIRM_EMAIL, {
    onCompleted: data => {
      updateUser({ ...user, passCode: data.passCode })
      setFormType("confirmSignup")
      setIsSubmitting(false)
    },
  })

  const { name, password, email, country, avatar } = userState

  useEffect(() => {}, [formType, user, errorMessage])

  const handleChange = e => {
    e.persist()
    if (e.target.name === "enteredPassCode") setEnteredPassCode(e.target.value)
    else setUserState({ ...userState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    switch (formType) {
      case "signIn":
        setIsSubmitting(true)
        const { error, data } = await authUser({
          variables: { email, password },
        })

        if (error) {
          setIsSubmitting(false)
          setFormType("signIn")
          setErrorMessage(error.message)
        }

        if (data) {
          setIsSubmitting(false)
          updateUser({
            user: data?.login.user,
            token: data?.login.token,
          })
          setFormType("signedIn")
          navigate("/")
          localStorage.setItem("token", data?.login.token)
        }
        // location.state.fromCheckout ? navigate("/checkout") : navigate("/")
        break
      case "signUp":
        try {
          setIsSubmitting(true)
          setValidationErrs([])
          const { error } = await genPassCode({
            variables: { newUser: userState },
          })
          if (error) {
            setErrorMessage("Could not generate a pass code, please retry")
          }
        } catch (err) {
          setIsSubmitting(false)
          const { errMsg, valErr } = inputErrHandler(err)
          setErrorMessage(errMsg)
          setValidationErrs(valErr)
        }
        break
      case "confirmSignup":
        try {
          setIsSubmitting(true)
          if (enteredPassCode !== user.passCode)
            setErrorMessage("Invalid code entered!")
          else {
            const { error } = await regUser({
              variables: { newUser: userState },
            })
            if (error)
              setErrorMessage(`Could not register user ${error.message}`)
          }
        } catch (err) {
          setIsSubmitting(false)
          const { errMsg } = inputErrHandler(err)
          setErrorMessage(errMsg || err.message)
        }
        break
      default:
        // navigate("/")
        break
    }
  }

  const handleButtonOption = () => {
    setFormType(formType === "signUp" ? "signIn" : "signUp")
  }

  return (
    <Layout>
      <Container>
        <Form className="form contact-form" onSubmit={e => handleSubmit(e)}>
          <FormTitle>
            {formType === "signUp"
              ? "Create an account and sign in"
              : "Sign in to your account"}
          </FormTitle>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              disabled={formType === "confirmSignup"}
              type="password"
              name="password"
              value={password}
              onChange={e => handleChange(e)}
            />
          </div>
          {formType === "signUp" && (
            <>
              <div className="form-field">
                <label htmlFor="name">User Name</label>
                <input
                  disabled={formType === "confirmSignup"}
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => handleChange(e)}
                />
              </div>
              {validationErrs.name && (
                <InputError>{validationErrs.name}</InputError>
              )}
              <div className="form-field">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  name="country"
                  value={country}
                  onChange={e => handleChange(e)}
                />
              </div>
              {validationErrs.country && (
                <InputError>{validationErrs.country}</InputError>
              )}
              <div className="form-field">
                <label htmlFor="avatar">Avatar</label>
                <input
                  type="text"
                  name="avatar"
                  value={avatar}
                  onChange={e => handleChange(e)}
                />
              </div>
            </>
          )}
          {formType === "confirmSignup" && (
            <div className="form-field">
              <label htmlFor="enteredPassCode">Confirmation Code</label>
              <input
                type="text"
                name="enteredPassCode"
                value={enteredPassCode}
                onChange={e => handleChange(e)}
              />
            </div>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="btn block btn-bgfg-colors"
          >
            {isSubmitting ? (
              <Svg name="logo" />
            ) : formType === "signUp" ? (
              "Sign Up"
            ) : formType === "confirmSignup" ? (
              "Confirm Sign Up"
            ) : (
              "Sign In"
            )}
          </Button>
          <TextCtr>
            <Text>
              {formType === "signIn"
                ? "Don't have an account?"
                : "Have an account?"}
              <TextLink type="button" onClick={handleButtonOption}>
                {formType === "signIn" ? " Sign Up" : " Sign In"}
              </TextLink>
            </Text>
            <TextLink type="button">Forgot password?</TextLink>
          </TextCtr>
        </Form>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90vw;
  max-width: var(--max-width);
  margin: 0 auto;
  min-height: calc(100vh - (6rem + 4rem));
`

const Form = styled.form`
  max-width: 30rem;
  justify-content: center;
  box-shadow: var(--shadow-4);
`

const FormTitle = styled.p`
  text-align: center;
  font-weight: 700;
`

const TextCtr = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.85rem;
`

const Text = styled.p`
  display: flex;
  gap: 0.3rem;
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
`

const TextLink = styled.button`
  background-color: transparent;
  color: var(--primary-1100);
  font-size: 0.8rem;
  font-style: italic;
  padding: 0.2rem;
  margin: 0;
  border: none;

  &:hover {
    color: var(--primary-100);
    font-style: bold;
  }
`

const InputError = styled.p`
  color: red;
`
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const Button = styled.button`
  &:disabled {
    background-color: var(--grey-600);
  }
  svg {
    justify-self: center;
    width: 18px;
    height: 18px;
    animation: ${spin} 1s linear infinite;
  }
`

export default Signin
