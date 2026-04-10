import express from "express"
import authMiddleware from "../middlewares/auth.js"
import properties from "../data/properties.js"
import Favourite from "../models/Favourite.js"

const router = express.Router()

// Get all properties
router.get("/", (req, res) => {
  return res.status(200).json(properties)
})

// Add to favourites
router.post("/:id/favourite", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id
    const propertyId = Number(req.params.id)

    console.log("POST favourite route hit")
    console.log("req.user:", req.user)
    console.log("propertyId:", propertyId)

    const property = properties.find((p) => p.id === propertyId)

    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    const existingFavourite = await Favourite.findOne({ userId, propertyId })

    if (existingFavourite) {
      return res.status(400).json({ message: "Already in favourites" })
    }
    
    const createdFavourite = await Favourite.create({ userId, propertyId })
    console.log("✅ SAVED:", createdFavourite)

    return res.status(201).json({ message: "Added to favourites" })
  } catch (error) {
    console.log("ADD FAVOURITE ERROR:", error)
    return res.status(500).json({
      message: "Failed to add favourite",
      error: error.message
    })
  }
})

// Get my favourites
router.get("/favourites/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id

    const myFavouriteRecords = await Favourite.find({ userId })

    const favouritePropertyIds = myFavouriteRecords.map((fav) => fav.propertyId)

    const myFavouriteProperties = properties.filter((property) =>
      favouritePropertyIds.includes(property.id)
    )

    return res.status(200).json(myFavouriteProperties)
  } catch (error) {
    console.log("GET FAVOURITES ERROR:", error)
    return res.status(500).json({
      message: "Failed to fetch favourites",
      error: error.message
    })
  }
})

// Remove from favourites
router.delete("/:id/favourite", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id
    const propertyId = Number(req.params.id)

    const deletedFavourite = await Favourite.findOneAndDelete({ userId, propertyId })

    if (!deletedFavourite) {
      return res.status(404).json({ message: "Favourite not found" })
    }

    return res.status(200).json({ message: "Removed from favourites" })
  } catch (error) {
    console.log("REMOVE FAVOURITE ERROR:", error)
    return res.status(500).json({
      message: "Failed to remove favourite",
      error: error.message
    })
  }
})

export default router