
import express from "express"
import Product from "../models/product"
import multer from "multer"
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router()

run().catch(err => console.log(err))
async function run() {
    // const product = await Product.create({
    //     name: "product1",
    //     price: 230
    // })
    // console.log(product)
}

router.get("/",  async (req: express.Request, res: express.Response) => {
    
    res.status(200).json({"msg": "it worked"})
})
export default router;