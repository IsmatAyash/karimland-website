import React, { useState } from "react"
import { CREATE_PRODUCT, IMAGE_UPLOAD } from "../../graphql/mutations"
import { useMutation } from "@apollo/client"
import styled from "styled-components"
import { Multiselect } from "multiselect-react-dropdown"

const initialValues = {
  title: "",
  unit: "kg",
  price: 0.0,
  image: "",
  category: "",
  inventory: 0,
  featured: false,
  oldPrice: 0.0,
  description: [{}],
  tags: [],
}

const Products = () => {
  const [image, setImage] = useState("")
  const [productDetails, setProductDetails] = useState(initialValues)
  const [descrip, setDescrip] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [errorDescrip, setErrorDescrip] = useState("")

  const tagsData = [
    { Tag: "Jam", id: 1 },
    { Tag: "Juice", id: 2 },
    { Tag: "Pickles", id: 3 },
    { Tag: "Compot", id: 4 },
  ]
  const [options] = useState(tagsData)

  const [createProduct] = useMutation(CREATE_PRODUCT)
  const [uploadImage] = useMutation(IMAGE_UPLOAD, {
    onCompleted: data => {
      setImage(data?.imageUpload.url)
      setProductDetails({ ...productDetails, image: data?.imageUpload.url })
    },
  })

  const handleSubmit = async e => {
    const { title, price, image } = productDetails
    e.preventDefault()
    try {
      if (!title || !image || price === 0) return
      const { data, error } = await createProduct({
        variables: {
          newProduct: productDetails,
        },
      })
      if (error) alert("Count not create product, check data entered?")
      if (data) {
        setImage("")
        setProductDetails(initialValues)
        setDescrip("")
        alert("Successfully added")
      }
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    switch (name) {
      case "inventory":
        setProductDetails({
          ...productDetails,
          [name]: parseInt(value),
        })
        break
      case "price":
      case "oldPrice":
        setProductDetails({
          ...productDetails,
          [name]: parseFloat(value),
        })
        break
      case "featured":
        setProductDetails({
          ...productDetails,
          featured: !productDetails.featured,
        })
        break
      case "descrip":
        setDescrip(value)
        break
      default:
        setProductDetails({ ...productDetails, [name]: value })
        break
    }
  }

  const handleFileUpload = async ({
    target: {
      validity,
      files: [file],
    },
  }) => validity.valid && (await uploadImage({ variables: { file } }))

  const handleTags = (selectedList, selectedItem) => {
    setProductDetails({
      ...productDetails,
      tags: selectedList.map(item => item.Tag),
    })
  }

  const handleDescription = e => {
    setErrorDescrip("")
    try {
      setProductDetails({
        ...productDetails,
        description:
          e.target.value.split("\n").map(item => JSON.parse(item)) || {},
      })
    } catch (error) {
      setErrorDescrip(
        `Input Error: should be in the form "title":"...","detial":"...",  ${error.message}`
      )
    }
  }

  return (
    <main className="page">
      <section className="admin-page">
        <header className="form-header">
          <h4>Add New Product</h4>
        </header>
        <form className="form contact-form" onSubmit={handleSubmit}>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
              <input type="file" accept="image/*" onChange={handleFileUpload} />
            )}
          </div>
          {image && (
            <>
              <div className="form-row">
                <div className="form-field form-field-flex2">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={productDetails.title}
                    onChange={e => handleChange(e)}
                    required
                  />
                </div>
                <div className="form-field form-field-flex1">
                  <label htmlFor="inventory">Inventory</label>
                  <input
                    type="number"
                    name="inventory"
                    id="inventory"
                    value={productDetails.inventory}
                    onChange={e => handleChange(e)}
                  ></input>
                </div>
                <div className="form-field form-field-flex1">
                  <label htmlFor="category">Product Category</label>
                  <div className="form-radio">
                    <input
                      className="radio-input"
                      type="radio"
                      value="Veges"
                      name="category"
                      id="radio1"
                      checked={productDetails.category === "Veges"}
                      onChange={e => handleChange(e)}
                    />
                    <label className="radio-label" htmlFor="radio1">
                      Veges
                    </label>
                    <input
                      className="radio-input"
                      type="radio"
                      value="Fruit"
                      name="category"
                      id="radio2"
                      checked={productDetails.category === "Fruit"}
                      onChange={e => handleChange(e)}
                    />
                    <label className="radio-label" htmlFor="radio2">
                      Fruit
                    </label>
                  </div>
                </div>
                <div className="form-field-flex1">
                  <label htmlFor="featured" className="form-checkbox">
                    <input
                      className="checkbox-input"
                      type="checkbox"
                      name="featured"
                      id="featured"
                      value={productDetails.featured}
                      checked={productDetails.featured}
                      onChange={e => handleChange(e)}
                    />
                    <div className="checkbox-box"></div>
                    Featured Product
                  </label>
                </div>
              </div>
              <div className="form-row">
                <div className="form-field form-field-flex1">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="of the form  seperated by -"
                    id="price"
                    value={productDetails.price}
                    onChange={e => handleChange(e)}
                    required
                  />
                </div>
                <div className="form-field form-field-flex1">
                  <label htmlFor="unit">Unit</label>
                  <select
                    className="select"
                    name="unit"
                    value={productDetails.unit}
                    selected={productDetails.unit}
                    onChange={e => handleChange(e)}
                  >
                    <option value="gr">gr</option>
                    <option value="kg">kg</option>
                    <option value="box">box</option>
                    <option value="piece">piece</option>
                    <option value="dozen">dozen</option>
                  </select>
                </div>
                <div className="form-field form-field-flex1">
                  <label htmlFor="oldPrice">Old Price</label>
                  <input
                    type="number"
                    name="oldPrice"
                    id="oldPrice"
                    value={productDetails.oldPrice}
                    onChange={e => handleChange(e)}
                  ></input>
                </div>
              </div>
              <div className="form-field">
                {errorDescrip && <InputError>{errorDescrip}</InputError>}
                <label htmlFor="descrip">Description</label>
                <Descrip
                  errorDescrip={errorDescrip}
                  name="descrip"
                  placeholder='{"title":"...", "detail":"..."} each in a new line'
                  id="descrip"
                  value={descrip}
                  onChange={e => handleChange(e)}
                  onBlur={handleDescription}
                />
              </div>
              <div className="form-field">
                <label htmlFor="tags">Tags</label>
                <Multiselect
                  onSelect={handleTags}
                  onRemove={handleTags}
                  options={options}
                  displayValue="Tag"
                  style={{
                    chips: { background: "var(--green-dark)" },
                  }}
                />
              </div>
              <button type="submit" className="btn block btn-bgfg-colors">
                Submit
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  )
}

const InputError = styled.p`
  color: red;
`

const Descrip = styled.textarea`
  border-color: ${({ errorDescrip }) =>
    errorDescrip !== "" ? "red" : "var(--grey-300)"};
`

export default Products
