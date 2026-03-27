import express from "express"
import authMiddleware from "../middlewares/auth.js"
const router = express.Router()

const properties = [
  {
    id: 1,
    title: "Apartment in Kathmandu",
    location: "Baneshwor",
    price: 8000000
  },
  {
    id: 2,
    title: "House in Lalitpur",
    location: "Jawalakhel",
    price: 12000000
  },
  {
    id: 3,
    title: "Flat in Bhaktapur",
    location: "Suryabinayak",
    price: 6000000
  },
  {
    id: 4,
    title: "Villa in Pokhara",
    location: "Lakeside",
    price: 15000000
  }
]

//
const favourites = []

router.get("/", (req, res) => {
  return res.status(200).json(properties)
})

router.post("/:id/favourite", authMiddleware, (req, res) => {
  const userId = req.user.id
  const propertyId = Number(req.params.id)

  //check property exists
  const property = properties.find(p => p.id === propertyId)

  if (!property) {
    return res.status(404).json({ message: "Property not found" })
  }

  //check duplicate
  const alreadyFavourite = favourites.find(fav => fav.userId === userId && fav.propertyId === propertyId)

  if (alreadyFavourite) {
    return res.status(400).json({ message: "Already in favourites" })
  }

  //save
  favourites.push({ userId, propertyId })
  return res.status(201).json({message: "Added to favourites",favourite: { userId, propertyId }})
})


//User-specific data filtering using authentication context
router.get("/favourites/me", authMiddleware, (req, res) => {
  const userId = req.user.id  //identify the user

  const myFavouriteRecords = favourites.filter(fav => fav.userId === userId) //get favorites of that user

  const favouritePropertyIds = myFavouriteRecords.map(fav => fav.propertyId) ///get only the property id

  const myFavouriteProperties = properties.filter(property =>
    favouritePropertyIds.includes(property.id)
  )   //get full property detail

  return res.status(200).json({
    message: "My favourites fetched successfully",
    favourites: myFavouriteProperties
  })
})
export default router