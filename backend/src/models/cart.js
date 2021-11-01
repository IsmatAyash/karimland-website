import { model, Schema } from "mongoose"

const cartSchema = new Schema(
  {
    quantity: { type: Number, required: true },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
)

const Cart = model("carts", cartSchema)

export default Cart

// user: {
//   type: Schema.Types.ObjectId,
//   ref: "User",
// },
