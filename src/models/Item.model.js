import mongoose from 'mongoose'
import { VALID_ITEM_TYPES } from '../config/feeRules.js';
const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    type:{
        type: String,
        enum : VALID_ITEM_TYPES,
        required : [true,'Type of the item is required']
    },
    creator: {
        type: String,
        required: [true,'Creator is required for each item'],
        trim : true
    },
    basevalue:{
        type : Number,
        required : true,
        min: 0
    },
    isCheckedOut: {
        type: Boolean,
        default: false,
    },
    currentLoanId :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Loan',
        default : null
    },
    lateFeePerDay : {
        type: Number,
        required: true,
        min: 0
    },
},
{
    timestamps: true
})

itemSchema.index({type: 1,isCheckedOut: 1});

export const Item = mongoose.model('Item',itemSchema)