class LibraryItems{
    constructor(title,id){
        this.title = title;
        this.id = id;
        this.isCheckedout = false;
        this.dueDate = null;
        this.borrowedBy = null;

    }
    getLateFeePerDay(){
        throw new Error('getLateFeePerDay() must be implemented in subclass');

    }
    getBaseValue(){
        throw new Error('getBaseValue() must be implemented in subclass');
    }
}

export default LibraryItems;