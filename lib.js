let R = require("ramda");
const getOrderedBooks = (unorderedBooks, bookScores) => {
  const books = R.split(" ", unorderedBooks);

  const lastBook = books[books.length - 1];

  const cleanedLastBook = lastBook.substring(0, lastBook.length - 1);
  books[books.length - 1] = cleanedLastBook;

  const booksAsNumbers = R.map(book => Number(book), books);

  const booksWithDetails = [];

  for (let i = 0; i < booksAsNumbers.length; i++) {
    booksWithDetails.push({
      value: bookScores[i],
      id: booksAsNumbers[i]
    });
  }

  const diff = (a, b) => {
    return b.value - a.value;
  };
  const orderedBooks = R.sort(diff, booksWithDetails); //=> [2, 4, 5, 7]

  return orderedBooks;
};

const calculateWeighting = (library, daysOfScanning) => {
  const signupLength = Number(R.split(" ", library.libraryDetails)[1]);
  const booksCanShip = Number(R.split(" ", library.libraryDetails)[2]);
  const libraryPerformance = (daysOfScanning - signupLength) * booksCanShip;

  const totalBookValue = R.sum(R.pluck("value", library.libraryBooks));

  const weightedPerformace = totalBookValue / libraryPerformance;

  return weightedPerformace;
};

module.exports = {
  getOrderedBooks,
  calculateWeighting
};
