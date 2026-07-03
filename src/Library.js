import FeeCalculator from "./services/FeeCalculator";
import Valuator from "./services/Valuator";

class Library{
    constructor(){
        this.items = [];
        this.feeCalculator = new FeeCalculator();
        this.valuator = new Valuator();
    }

    checkOut(itemId,dayBorrowed,customer){
        const item = this.items.find(i => i.id === itemId);

        if(!item || item.isCheckedout){
            return false;
        }
        item.isCheckedout = true;

        const d = new Date();
        d.setDate(d.getDate() + dayBorrowed);

        item.dueDate = d;

        item.customer = customer
        return true;
    }
    returnItem(itemId){
        const item = this.items.find(i => i.id === itemId);
        if(!item || !item.isCheckedout){
            return null;
        }
        const fee = this.feeCalculator.calculateLateFee(item,item.customer);
        item.isCheckedout = false;
        item.dueDate = null;
        item.customer = null;
        return fee;
    }

    addItem(item){
        this.items.push(item);
    }
    getTotalValue(){
        return this.valuator.getTotalValue(this.items);
    }
}