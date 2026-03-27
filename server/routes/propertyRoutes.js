import express from "express"
import authMiddleware from "../middlewares/auth.js"
import properties from "../data/properties.js"
import favourites from "../data/favourites.js"

const router = express.Router()

// Get all properties
router.get("/", (req, res) => {
  return res.status(200).json(properties)
})

// Add to favourites
router.post("/:id/favourite", authMiddleware, (req, res) => {
  const userId = req.user.id
  const propertyId = Number(req.params.id)

  const property = properties.find(p => p.id === propertyId)

  if (!property) {
    return res.status(404).json({ message: "Property not found" })
  }

  const alreadyFavourite = favourites.find(
    fav => fav.userId === userId && fav.propertyId === propertyId
  )

  if (alreadyFavourite) {
    return res.status(400).json({ message: "Already in favourites" })
  }

  favourites.push({ userId, propertyId })

  return res.status(201).json({ message: "Added to favourites" })
})

// Get my favourites
router.get("/favourites/me", authMiddleware, (req, res) => {
  const userId = req.user.id

  const myFavouriteRecords = favourites.filter(fav => fav.userId === userId)

  const favouritePropertyIds = myFavouriteRecords.map(fav => fav.propertyId)

  const myFavouriteProperties = properties.filter(property =>
    favouritePropertyIds.includes(property.id)
  )

  return res.status(200).json(myFavouriteProperties)
})

// Remove from favourites
router.delete("/:id/favourite", authMiddleware, (req, res) => {
  const userId = req.user.id
  const propertyId = Number(req.params.id)

  const favouriteIndex = favourites.findIndex(
    fav => fav.userId === userId && fav.propertyId === propertyId
  )

  if (favouriteIndex === -1) {
    return res.status(404).json({ message: "Favourite not found" })
  }

  favourites.splice(favouriteIndex, 1)

  return res.status(200).json({ message: "Removed from favourites" })
})

export default router