import {Customer} from '../models/Customer.model.js'

import { VALID_CUSTOMER_TYPES } from '../config/feeRules.js'


async function createCustomer(req,res){
    try {
        const {name,contact,type} = req.body;

        if(!name){
            return res.status(400).json({message: "Provide name and customer type"});
        }
        if (type && !VALID_CUSTOMER_TYPES.includes(type)) {
                return res.status(400).json({ message: 'Irrelevant type of customer provided' });
            }
        

        const makeCustomer = await Customer.create({
            name,
            customerType: type,
            contact
        })

        return res.status(201).json({message: 'customer created successfully',makeCustomer});
        
    } catch (error) {
        return res.status(500).json({message: `${error.message}`})
    }
}

async function getCustomer(req,res){
    try {
        const {name,page,limit} = req.query;

        const filter = {}
        if(name){
            filter.name = {$regex: name,$options: 'i'};
        }

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 20;

        const skip = (pageNum - 1) * limitNum;

        const customers = await Customer.find(filter).skip(skip).limit(limitNum);
        const total = await Customer.countDocuments(filter)

        return res.status(200).json({customers,total,page: pageNum,totalPages: Math.ceil(total/limitNum)})
    } catch (error) {
        return res.status(500).json({message: `${error.message}`});
    }
}

export {createCustomer,getCustomer}