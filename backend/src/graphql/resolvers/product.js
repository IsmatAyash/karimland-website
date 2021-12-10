import { ApolloError, UserInputError } from "apollo-server-express"
import { GraphQLUpload } from "graphql-upload"
import { S3BUCKET } from "../../config"
import handleFileUpload from "../../functions/fileUpload"
import { ProductRules } from "../../validators/product"

const myCustomLabels = {
  totalDocs: "productCount",
  docs: "products",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
}

export default {
  Upload: GraphQLUpload,
  Query: {
    // products: async (parent, args, { Product }) => {
    //   try {
    //     const prod = await Product.find().populate("seller").exec()
    //     if (!prod) throw new ApolloError("Unable to query products.")
    //     return prod
    //   } catch (err) {
    //     throw new ApolloError(err.message, 400)
    //   }
    // },
    getProduct: async (_, { id }, { Product }) => {
      return await Product.findById(id).populate("seller")
    },
    products: async (parent, { cat, page, limit }, { Product }) => {
      try {
        const options = {
          limit: limit || 10,
          page: page || 1,
          sort: { createdAt: 1 },
          populate: "seller",
          customLabels: myCustomLabels,
        }
        return await Product.paginate({ category: cat }, options)
      } catch (error) {
        console.log(error.message)
        throw new ApolloError(error.message, 400)
      }
    },
  },

  Mutation: {
    createProduct: async (_, { newProduct }, { Product, User, user }) => {
      try {
        await ProductRules.validate(newProduct, { abortEarly: false })
        let result = await Product.create({ ...newProduct, seller: user.sub })
        if (!result) {
          throw new ApolloError("Unable to create product")
        } else {
          let usr = await User.findById(user.sub)
          usr.sellerProducts.push(result.id)
          await usr.save()
          await result.populate("seller")
          return result
        }
      } catch (err) {
        console.log(err.message)
        throw new UserInputError(err.message, 400)
      }
    },
    editProductById: async (_, { updatedProduct, id }, { Product, user }) => {
      try {
        let editedProd = await Product.findOneAndUpdate(
          { _id: id, seller: user.sub },
          { ...updatedProduct },
          { new: true }
        )
        if (!editedProd) throw new ApolloError("Unable to update the product")
        await editedProd.populate("seller")
        return editedProd
      } catch (err) {
        throw new ApolloError(err.message, 400)
      }
    },
    imageUpload: async (_, { file }) => {
      // const response = await handleFileUpload(file)
      // return { key: params.Key, url: result.Location }
    },
    delProductById: async (_, { id }, { Product }) => {
      try {
        const deletedProd = await Product.findOneAndDelete(id)
        if (!deletedProd)
          throw new ApolloError("Unable to delete this product.")
        return {
          success: true,
          id: deletedProd.id,
          message: "Product was deleted successfully.",
        }
      } catch (err) {
        throw new ApolloError(err.message, 400)
      }
    },
  },
  // imageUpload: async (_, { file }) => {
  // const params = {
  //   Bucket: S3BUCKET,
  //   Key: "",
  //   Body: "",
  //   ACL: "public-read",
  // }
  // let { createReadStream, filename } = await file
  // let fileStream = createReadStream()
  // fileStream.on("error", error => console.error(error))
  // params.Body = fileStream
  // let timestamp = new Date().getTime()
  // let file_extension = extname(filename)
  // params.Key = `images/${timestamp}${file_extension}`
  // let upload = promisify(this.s3.upload.bind(this.s3))
  // let result = await upload(params).catch(console.log)
  // let object = {
  //   key: params.Key,
  //   url: result.Location,
  // }
  //   let s3Payload = {
  //     key: "",
  //     url: "",
  //   }
  //   return ""
  // },
}
