class CustomerType{
    constructor(type,discount){
        this.type = type;
        this.discount = discount;
    }
    getDiscountMultiplier(){
        throw error('Required to provide the reference of this method')
    }
}
export default CustomerType