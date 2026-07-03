import CustomerType from "./CustomerType";

class Student extends CustomerType{
    constructor(){
        super(type,discount);
    }
    getDiscountMultiplier(){
        return 0.6;
    }
}