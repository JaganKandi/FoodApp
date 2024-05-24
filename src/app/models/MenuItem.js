import mongoose, { Schema, model, models } from "mongoose";
import { type } from "os";

const ExtraPriceSchema = new Schema({
    name: String,
    price: Number,
})


const MenuItemsSchema = new Schema({
    image: {type: String},
    name: {type: String},
    description: {type: String},
    category: {type: mongoose.Types.ObjectId},
    basePrice: {type: Number},
    sizes: {type: [ExtraPriceSchema]},
    extraIngridientsPrices: {type: [ExtraPriceSchema]}
}, {timestamps: true})

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemsSchema);