import LibraryItems from "./LibraryItems.js";
class Book extends LibraryItems{
    constructor(title,author,id,genre){
       super(title,id);
       this.author = author;
       this.genre = genre;
    }

    getLateFeePerDay(){
        return 5;
    }
    getBaseValue(){
        return 100;
    }
}
export default Book