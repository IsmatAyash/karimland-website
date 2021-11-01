import { model, Schema } from "mongoose"

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    unit: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
)

const Product = model("products", productSchema)

export default Product

// seller: { type: Schema.Types.ObjectId, ref: "Seller" },
// inventory: { type: Number },
// category: { type: String, required: true },
// featured: { type: Boolean },
// oldprice: { type: Number },
// rating: { type: Number },
// avgRating: { type: Number },
// description: { type: Object },
// tags: { type: Array },
