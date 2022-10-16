import express from "express"
import User, { IUserCreated } from "../models/user"
import Product, { IProduct } from "../models/product"
const router = express.Router()

run().catch(err => console.log(err))
async function run() {
   const res = await User.loginUser("test@gmail.com", "12345")
   console.log(res)
//    console.log(await User.remove({}))
   

}


router.post("/login",  async (req: express.Request, res: express.Response) => {
    const user = await User.loginUser(req.body.email, req.body.password)
    res.status(200).json(user)
})
router.post("/register",  async (req: express.Request, res: express.Response) => {
    const user = await User.createNewUser(req.body.email, req.body.password)
    res.status(200).json(user)
})
export default router;