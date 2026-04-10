// import express from "express"
// import cors from "cors"
// import authRoutes from "./routes/authRoutes.js"
// import authMiddleware from "./middlewares/auth.js"
// import propertyRoutes from "./routes/propertyRoutes.js"

// const app = express()

// app.use(cors())
// app.use(express.json())

// app.get("/", (req, res) => {
//   res.send("real state broker api running")
// })

// app.get("/hello", (req, res) => {
//   res.send("hello subham")
// })

// app.use("/api/auth", authRoutes)
// app.use("/api/properties", propertyRoutes)

// app.get("/api/profile", authMiddleware, (req, res) => {
//   return res.status(200).json({message: "Protected route accessed successfully",user: req.user})
// })
// const PORT = 5000

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
import "dotenv/config"
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import authMiddleware from "./middlewares/auth.js"
import propertyRoutes from "./routes/propertyRoutes.js"
const app = express()

connectDB()

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))

app.use(express.json())

app.get("/", (req, res) => {
  res.send("real estate broker api running")
})

app.use("/api/auth", authRoutes)
app.use("/api/properties", propertyRoutes)

app.get("/api/profile", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Protected route accessed successfully",
    user: req.user,
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})