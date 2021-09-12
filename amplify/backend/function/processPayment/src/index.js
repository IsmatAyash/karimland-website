const { CognitoIdentityServiceProvider } = require("aws-sdk")
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider()
const USER_POOL_ID = "eu-west-2_TsrFRqqhk"
const stripe = require("stripe")(
  "sk_test_51HRNBKE41CMIaPCOww03taSl9ltP2blnlsTg4j8Tr5jNr50t7UyImVdFVgiI19QboWFNDaLhrUqlGHFHHmGAxf8u00kCDIT8DA"
)

const getUserEmail = async event => {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: event.identity.claims.username,
  }
  const user = await cognitoIdentityServiceProvider
    .adminGetUser(params)
    .promise()
  const { Value: email } = user.UserAttributes.find(attr => {
    if (attr.Name === "email") {
      return attr.Value
    }
  })
  return email
}

/*
 * Get the total price of the order
 * Charge the customer
 */
exports.handler = async event => {
  try {
    const { id, cart, total, address, name, phone, token } =
      event.arguments.input
    const { username } = event.identity.claims
    const email = await getUserEmail(event)

    await stripe.charges.create({
      amount: total * 100,
      currency: "usd",
      source: token,
      description: `Order ${new Date()} by ${email}`,
    })
    return { id, cart, total, address, name, phone, username, email }
  } catch (err) {
    throw new Error(err)
  }
}
