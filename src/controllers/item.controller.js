import { FEE_RULES } from '../config/feeRules.js';
import {Item } from '../models/Item.model.js'

async function createItem(req,res){
    try {
        const {title,type,creator,basevalue} = req.body;

        if(!title || !type || !creator || !basevalue){
            return res.status(400).json({message: "Need to provide all the details before creating an Item"})
        }
        const rules = FEE_RULES[type];

        if(!rules){
            return res.status(400).json({message: 'Unknow type of item cannot be added'})
        }
        const newItem = await Item.create(
            {
                title,
                type,
                creator,
                basevalue,
                lateFeePerDay: rules.lateFeePerDay
            }    
        )

        return res.status(201).json({message:'Item addead successfully',item: newItem});

    } catch (error) {
        return res.status(500).json({message: `${error.message}`})
    }
}


async function getItems(req,res){
    try {
     const {type,checkedOut,page,limit} = req.query;

    const filter = {};
    if(type){
        filter.type = type;
    }

    if(checkedOut !== undefined){
        filter.isCheckedOut = checkedOut === 'true';
    }
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;

    const skip = (pageNum - 1) * limitNum;

    const items = await Item.find(filter).skip(skip).limit(limitNum);

    const total = await Item.countDocuments(filter)
    

    return res.status(200).json({
        items,
        total,
        page: pageNum,
        totalPages: Math.ceil(total/limitNum)
    })
    } catch (error) {
        
        return res.status(500).json({message: `${error.message}`})
    }
}
export {createItem,getItems}