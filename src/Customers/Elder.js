import CustomerType from "./CustomerType";

class Elder extends CustomerType{
    constructor(){
        super(type,discount);
    }
    getDiscountMultiplier(){
        return 0.4;
    }
}