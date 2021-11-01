import React, { useState, useEffect, useContext } from "react"
import { getCart } from "../api/queries"
import Layout from "../components/Layout"
import { UserContext } from "../context/users"
import { SavedCartContext } from "../context/cart"
import { navigate } from "gatsby"
import styled from "styled-components"

const initialState = {
  username: "",
  password: "",
  email: "",
  authCode: "",
  formType: "signin",
}

const SignIn = ({ location }) => {
  const { updateUser } = useContext(UserContext)
  const { updateCart } = useContext(SavedCartContext)
  const [authState, setAuthState] = useState(initialState)

  const { username, password, authCode, email } = authState

  useEffect(() => {
    // Hub.listen("auth", checkUser)
    // checkUser()
    // return () => Hub.remove("auth", checkUser)
  }, [])

  // useEffect(() => {
  //   const updUser = async () => {
  //     try {
  //       const user = await Auth.currentAuthenticatedUser()
  //       setUser({
  //         id: user.attributes.sub,
  //         username: user.username,
  //         email: user.attributes.email,
  //       })
  //     } catch {
  //       setUser(null)
  //     }
  //   }
  //   Hub.listen("auth", updUser) // listen for login/signup events

  //   // we are not using async to wait for updateUser, so there will be a flash of page where the user is assumed not to be logged in. If we use a flag
  //   updUser() // check manually the first time because we won't get a Hub event
  //   return () => Hub.remove("auth", updUser) // cleanup
  // }, [])

  async function checkUser() {
    try {
      // const user = await Auth.currentAuthenticatedUser()
      // const oneTodo = await API.graphql(
      //   graphqlOperation(queries.getTodo, { id: "some id" })
      // )
      // const cart = await API.graphql(
      //   graphqlOperation(getCart, { user: user.username })
      // )
      // updateUser({
      //   id: user.attributes.sub,
      //   username: user.username,
      //   email: user.attributes.email,
      // })
      setAuthState({ ...authState, formType: "signedIn" })
    } catch (err) {
      updateUser(null)
    }
  }

  const handleChange = e => {
    e.persist()
    setAuthState({ ...authState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    switch (formType) {
      case "signin":
        // try {
        //   await Auth.signIn(username, password)
        //   setAuthState({ ...authState, formType: "signedIn" })
        //   location.state.fromCheckout ? navigate("/checkout") : navigate("/")
        // } catch (error) {
        //   console.log("error signing in", error)
        // }
        break
      case "signup":
        // try {
        //   await Auth.signUp({
        //     username,
        //     password,
        //     attributes: { email },
        //   })
        //   setAuthState({ ...authState, formType: "confirmSignup" })
        // } catch (error) {
        //   console.log("error sigining up", error)
        // }
        break
      case "confirmSignup":
        // try {
        //   await Auth.confirmSignUp(username, authCode)
        //   setAuthState({ ...authState, formType: "signin" })
        // } catch (error) {
        //   console.log("error sigining up", error)
        // }
        break
      default:
        navigate("/vegetables")
        break
    }
  }

  const handleButtonOption = () => {
    setAuthState({
      ...authState,
      formType: formType === "signup" ? "signin" : "signup",
    })
  }

  const { formType } = authState

  return (
    <Layout>
      <Container>
        <Form className="form contact-form" onSubmit={e => handleSubmit(e)}>
          <FormTitle>Sign in to your account</FormTitle>
          <div className="form-field">
            <label htmlFor="username">User Name</label>
            <input
              disabled={formType === "confirmSignup"}
              type="text"
              name="username"
              value={username}
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
          {formType === "signup" && (
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={e => handleChange(e)}
              />
            </div>
          )}
          {formType === "confirmSignup" && (
            <div className="form-field">
              <label htmlFor="authCode">Confirmation Code</label>
              <input
                type="text"
                name="authCode"
                value={authCode}
                onChange={e => handleChange(e)}
              />
            </div>
          )}
          <button type="submit" className="btn block btn-bgfg-colors">
            {formType === "signin"
              ? "Sign In"
              : formType === "confirmSignup"
              ? "Confirm Sign Up"
              : "Sign Up"}
          </button>
          <TextCtr>
            <Text>
              {formType === "signin"
                ? "Don't have an account?"
                : "Have an account?"}
              <TextLink onClick={handleButtonOption}>
                {formType === "signin" ? " Sign Up" : " Sign in"}
              </TextLink>
            </Text>
            <TextLink>Forgot password?</TextLink>
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
  margin-top: 0.5rem;
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
  color: var(--primary-700);
  font-size: 0.8rem;
  font-style: italic;
  padding: 0;
  margin: 0;

  &:hover {
    background-color: transparent;
    color: var(--primary-1100);
  }
`

export default SignIn
