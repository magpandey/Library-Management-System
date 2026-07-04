import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
    itemId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Item',
        required : true,
    },
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Customer",
        required : true,
    },
    issueDate : {
        type: Date,
        required : true,
        default : Date.now,

    },
    dueDate : {
        type: Date,
        default : null,
    },
    returnDate : {
        type : Date,
        default :0,
        min : 0,
    },
    LateFeeCharged : {
        type : Number,
        default : 0,
        min : 0,
    }
},{
    timestamps : true
})

loanSchema.index ({itemId : 1,returnDate : 1})

loanSchema.index({customerId : 1})

export const Loan = mongoose.model('Loan',loanSchema);