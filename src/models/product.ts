import {  Schema, HydratedDocument, model, InferSchemaType, Model } from 'mongoose';

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    slug: {type: String},
    img: {
        contentType: String,
        buffer: Buffer
    },
    owner: {type: Schema.Types.ObjectId, ref:"User"},
    desc: {type: String, required: true},


},
{
    timestamps: true
})
productSchema.static('createNewProduct', async function createNewProduct() {
  return 'static product'
});

productSchema.pre("save", function( next): void {
    this.slug = this.name + Date.now().toString()
    next()
})
export type IProduct = InferSchemaType<typeof productSchema >
interface ProductModel  extends Model<IProduct>{
    createNewProduct(): Promise<HydratedDocument<IProduct>>
}
export default model<IProduct, ProductModel>("Product", productSchema)