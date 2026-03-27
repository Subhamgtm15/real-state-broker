import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = express.Router()

const users = []
const JWT_SECRET = "mysecretkey"

//register 
router.post("/register", async (req, res) => {
  try{
    const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check existing user
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "email already registered" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {id: Date.now(),name,email,password: hashedPassword,role: "buyer"};

  users.push(newUser);

  return res.status(201).json({ message: "user registered successfully" });
  }
  catch(err){
    console.error("REGISTER ERROR:", err);
        res.status(500).json({ error: "Something went wrong", details: err.message });
  }
  
});

//login
router.post("/login", async (req, res) => {
  try {
    //Get email & password
    const { email, password } = req.body

    //validate input 
    if (!email || !password) {
      return res.status(400).json({message: "Email and password are required"})
    }
    //find user by email
    const userExist = users.find((user) => user.email === email)

    //if user not found, invalid
    if (!userExist) {
      return res.status(400).json({message: "Invalid credentials"})
    }

    //compared user's password with hashed password
    const isMatch = await bcrypt.compare(password, userExist.password)

    //if password not same 
    if (!isMatch) {
      return res.status(400).json({message: "Invalid credentials"})
    }
    //generate token
    const token = jwt.sign(
      {id: userExist.id,email: userExist.email,role: userExist.role},
      JWT_SECRET,
      { expiresIn: "1h" }
    )

    return res.status(200).json({message: "Login successful",token,
      user: {id: userExist.id,name: userExist.name,email: userExist.email,role: userExist.role}
    })  // to display in frontend
  } catch (error) {
    console.log("LOGIN ERROR:", error)
    return res.status(500).json({message: "Something went wrong",error: error.message})
  }
})

export default router