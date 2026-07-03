import LibraryItems from "./LibraryItems";
class CD extends LibraryItems{
    constructor(title,id,artist){
        super(title,id);
        this.artist = artist;
    }
    getLateFeePerDay(){
        return 2;
    }
    getBaseValue(){
        return 50;
    }
}
export default CD;