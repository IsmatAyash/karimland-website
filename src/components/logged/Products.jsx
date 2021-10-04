import React, { useState, useContext } from "react"
import { v4 as uuidv4 } from "uuid"
import { API, graphqlOperation, Storage, Hub, Auth } from "aws-amplify"
import { createProduct } from "../../api/mutations"
import config from "../../aws-exports"
import Layout from "../Layout"
import { UserContext } from "../../context/users"

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config

const initialValues = {
  title: "",
  image: "",
  quantity: 0,
  oldPrice: 0.0,
  avgRating: 0.0,
  ratings: 0,
  prodType: "",
  featured: false,
  prices: [{ weight: "", proce: 0 }],
  description: [{ header: "", detail: "" }],
  tags: [],
}
const Products = () => {
  const { updateUser } = useContext(UserContext)
  const [image, setImage] = useState("")
  const [productDetails, setProductDetails] = useState(initialValues)

  // useEffect(() => {
  //   const updUser = async () => {
  //     try {
  //       const usr = await Auth.currentAuthenticatedUser()
  //       updateUser(usr)
  //     } catch {
  //       updateUser(null)
  //     }
  //   }
  //   Hub.listen("auth", updUser) // listen for login/signup events

  //   // we are not using async to wait for updateUser, so there will be a flash of page where the user is assumed not to be logged in. If we use a flag
  //   updUser() // check manually the first time because we won't get a Hub event
  //   return () => Hub.remove("auth", updUser) // cleanup
  // }, [])

  const handleSubmit = async e => {
    console.log("Submit clicked")
    e.preventDefault()
    try {
      if (
        !productDetails.title ||
        !productDetails.prices ||
        !productDetails.image
      )
        return
      await API.graphql(
        graphqlOperation(createProduct, { input: productDetails })
      )
      setProductDetails(initialValues)
      alert("Successfully added")
    } catch (err) {
      console.log("error creating product:", err)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    if (name === "prices" || name === "description" || name === "tags") {
      const jsonArray = value.split("-")
      setProductDetails({ ...productDetails, [name]: jsonArray })
    } else if (name === "featured")
      setProductDetails({
        ...productDetails,
        featured: !productDetails.featured,
      })
    else setProductDetails({ ...productDetails, [name]: value })
  }

  const handleImageUpload = async e => {
    e.preventDefault()
    const file = e.target.files[0]
    const extension = file.name.split(".")[1]
    const name = file.name.split(".")[0]
    const key = `images/${uuidv4()}${name}.${extension}`
    const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
    try {
      // Upload the file to s3 with public access level.
      await Storage.put(key, file, {
        level: "public",
        contentType: file.type,
      })
      // Retrieve the uploaded file to display
      const image = await Storage.get(key, { level: "public" })
      setImage(image)
      setProductDetails({
        ...productDetails,
        image: url,
      })
      console.log("image key", image)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <main className="page">
        <section className="admin-page">
          <header className="form-header">
            <h4>Add New Product</h4>
          </header>
          <form className="form contact-form" onSubmit={handleSubmit}>
            <div className="form-image">
              <div>Product image</div>
              {image ? (
                <img
                  level="public"
                  className="image-preview"
                  src={image}
                  alt="admin preview"
                />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleImageUpload(e)}
                />
              )}
            </div>
            <div className="form-row">
              <div className="form-field form-field-flex2">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={e => handleChange(e)}
                  required
                />
              </div>
              <div className="form-field form-field-flex1">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  onChange={e => handleChange(e)}
                ></input>
              </div>
              <div className="form-field form-field-flex1">
                <label htmlFor="prodType">Product Type</label>
                <div className="form-radio">
                  <input
                    className="radio-input"
                    type="radio"
                    value="Veges"
                    name="prodType"
                    id="radio1"
                    checked={productDetails.prodType === "Veges"}
                    onChange={e => handleChange(e)}
                  />
                  <label className="radio-label" htmlFor="radio1">
                    Veges
                  </label>
                  <input
                    className="radio-input"
                    type="radio"
                    value="Fruit"
                    name="prodType"
                    id="radio2"
                    checked={productDetails.prodType === "Fruit"}
                    onChange={e => handleChange(e)}
                  />
                  <label className="radio-label" htmlFor="radio2">
                    Fruit
                  </label>
                </div>
                {/* <label for="prodType">Product Type</label>
                  <select name="prodType" id="prodType">
                    <option value="veges">Veges</option>
                    <option value="fruit">Fruit</option>
                  </select> */}
              </div>
              <div className="form-field-flex1">
                <label htmlFor="featured" className="form-checkbox">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    name="featured"
                    id="featured"
                    checked={productDetails.featured}
                    onChange={e => handleChange(e)}
                  />
                  <div className="checkbox-box"></div>
                  Featured Product
                </label>
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="prices">Prices</label>
              <input
                name="prices"
                placeholder="of the form  seperated by -"
                id="prices"
                onChange={e => handleChange(e)}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-field form-field-flex2">
                <label htmlFor="oldPrice">Old Price</label>
                <input
                  type="text"
                  name="oldPrice"
                  id="oldPrice"
                  onChange={e => handleChange(e)}
                ></input>
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                placeholder="of the form {header:..., detail:...} seperated by -"
                id="description"
                onChange={e => handleChange(e)}
              ></input>
            </div>
            <div className="form-field">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                name="tags"
                placeholder="of the form (tag1-tag2-tag3) seperated by -"
                id="tags"
                onChange={e => handleChange(e)}
              ></input>
            </div>
            <button type="submit" className="btn block btn-bgfg-colors">
              Submit
            </button>
          </form>
        </section>
      </main>
    </Layout>
  )
}

export default Products
