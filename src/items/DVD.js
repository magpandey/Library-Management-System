import LibraryItems from "./LibraryItems";

class DVD extends LibraryItems{
    constructor(title,id,director){
        super(title,id);
        this.director = director;
    }

    getLateFeePerDay(){
        return 3;
    }
    getBaseValue(){
        return 60;
    }
}
export default DVD