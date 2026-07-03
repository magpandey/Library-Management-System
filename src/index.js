import Book from './Library/Book';
import CD from './Library/CD';
import DVD from './Library/DVD';
import Library from './Library/Library';
import FeeCalculator from './Library/services/FeeCalculator';
import Valuator from './Library/services/Valuator';

const feecalc = new FeeCalculator();
const valuator = new Valuator();

const myLibrary = new Library();

myLibrary.addItem(new Book("The Great Gatsby", "b1", "F. Scott Fitzgerald"));
myLibrary.addItem(new CD("Thriller", "c1", "Michael Jackson"));
myLibrary.addItem(new DVD("Inception", "d1", "Christopher Nolan"));

myLibrary.addItem()
myLibrary.checkOut("b1", 7);

 // should return 0 if returned on time, or the late fee if returned late

myLibrary.items[0].dueDate = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000); // set due date to 8 days ago

console.log(myLibrary.returnItem("b1"));

console.log('checkout log fake id', myLibrary.checkOut("fakeid", 7)); // should return false
