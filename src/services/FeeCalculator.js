class FeeCalculator{
    calculateLateFee(item,customer){
        const today = new Date();
        if(!item.dueDate || today <= item.dueDate){
            return 0;
        }
        const daysLate = Math.ceil((today - item.dueDate) / (1000 * 60 * 60 * 24));
        return (daysLate * item.getLateFeePerDay() * customer.getCustomerDiscount());
    }
}

export default FeeCalculator