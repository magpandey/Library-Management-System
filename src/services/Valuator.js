//this all it does is calulate the total

class Valuator{
    getTotalValue(items){
        let total = 0;
        items.items.forEach(item => {
            total += item.getBaseValue;
        });

        return total;
    }
}

export default Valuator;