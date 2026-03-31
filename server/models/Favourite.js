import mongoose from "mongoose"

const favouriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    propertyId: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

// prevents duplicate favourites for same user + property
favouriteSchema.index({ userId: 1, propertyId: 1 }, { unique: true })

const Favourite = mongoose.model("Favourite", favouriteSchema)

export default Favourite