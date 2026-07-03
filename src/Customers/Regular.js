import CustomerType from "./CustomerType";

class Regular extends CustomerType{
    constructor(){
        super(type,discount);
    }
    getDiscountMultiplier(){
        return 1;
    }
}