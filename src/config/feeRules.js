
const FEE_RULES = {
    book : {lateFeePerDay : 5},
    cd : {lateFeePerDay : 10},
    dvd : {lateFeePerDay : 6}
}

const VALID_ITEM_TYPES = Object.keys(FEE_RULES)

const CUSTOMER_DISCOUNTS = {
    regular : 1.0,
    student : 0.5,
    elder : 0.4,
};

const VALID_CUSTOMER_TYPES   = Object.keys(CUSTOMER_DISCOUNTS);


export { VALID_CUSTOMER_TYPES,VALID_ITEM_TYPES,CUSTOMER_DISCOUNTS,FEE_RULES };