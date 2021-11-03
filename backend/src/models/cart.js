import { model, Schema } from "mongoose"

const cartSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
)

const Cart = model("carts", cartSchema)

export default Cart
