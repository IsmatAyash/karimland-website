import { model, Schema } from "mongoose"
import paginator from "mongoose-paginate-v2"

const orderDetail = new Schema({
  title: { type: String, required: true },
  unit: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
})

const orderSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    details: [orderDetail],
    orderStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
    shippedAt: Date,
    fromAddress: String,
    toAddress: String,
    trackingNo: String,
  },
  { timestamps: true }
)

orderSchema.plugin(paginator)

const Order = model("orders", orderSchema)

export default Order
