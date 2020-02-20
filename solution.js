let fs = require('fs');
let R = require('ramda');

const problems = {
  a: {
    problemFile: 'a_example.txt',
    solutionFile: 'a_example.out'
  },
  b: {
    problemFile: 'b_read_on.txt',
    solutionFile: 'b_read_on.out'
  },
  c: {
    problemFile: 'c_incunabula.txt',
    solutionFile: 'c_incunabula.out'
  },
  d: {
    problemFile: 'd_tough_choices.txt',
    solutionFile: 'd_tough_choices.out'
  },
  e: {
    problemFile: 'e_so_many_books.txt',
    solutionFile: 'e_so_many_books.out'
  },
  f: {
    problemFile: 'f_libraries_of_the_world.txt',
    solutionFile: 'f_libraries_of_the_world.out'
  }
}

const currentlySolving = problems[process.argv.slice(2)[0]];

var contents = fs.readFileSync(currentlySolving.problemFile, 'utf8');

const firstRow = R.head(R.split('\n', contents));

const numberOfBooks = Number(R.split(' ', firstRow)[0]);
const numberOfLibraries = Number(R.split(' ', firstRow)[1]);
const daysOfScanning = Number(R.split(' ', firstRow)[2]);

//1 2 3 6 5 4
const secondRow = (R.split('\n', contents))[1];
const scoresOfBooks = R.map(score => Number(score))(R.split(' ', secondRow));

const getOrderedBooks = (unorderedBooks) => {
  const books = R.split(' ', unorderedBooks);

  const lastBook = books[books.length - 1];

  const cleanedLastBook = lastBook.substring(0, lastBook.length - 1);
  books[books.length - 1] = cleanedLastBook;

  const booksAsNumbers = R.map(book => Number(book), books);


  const booksWithDetails = [];

  for (let i = 0; i < booksAsNumbers.length; i++) {
    booksWithDetails.push({
      value: scoresOfBooks[i],
      id: booksAsNumbers[i],
    });
  }


  const diff = (a, b) => { return b.value - a.value; };
  const orderedBooks = R.sort(diff, booksWithDetails); //=> [2, 4, 5, 7]

  return orderedBooks;
};

const libraries = [];
for (let i = 2; i <= (numberOfLibraries + 2); i += 2) {
  const library = {
    libraryDetails: R.split('\n', contents)[i],
    libraryBooks: getOrderedBooks(R.split('\n', contents)[i + 1]),
    id: i / 2 - 1,
  }

  libraries.push(library);
}

const calculateWeighting = (library) => {
  const signupLength = Number(R.split(' ', library.libraryDetails)[1]);
  const booksCanShip = Number(R.split(' ', library.libraryDetails)[2]);
  const weight = (daysOfScanning - signupLength) * booksCanShip;

  return weight;
}

for (let i = 0; i < libraries.length; i++) {
  libraries[i].weighting = calculateWeighting(libraries[i]);
}

const diff = (a, b) => b.weighting - a.weighting;
const orderedLibraries = R.sort(diff, libraries); //=> [2, 4, 5, 7]


const numberOfLibrariesToSignUp = orderedLibraries.length;



const file = fs.createWriteStream(problems[process.argv.slice(2)[0]].solutionFile);

// file.on('error', function(err) { /* error handling */ });

file.write(`${numberOfLibrariesToSignUp}`);
file.write('\r\n');
for (let i = 0; i < orderedLibraries.length; i++) {
  const library = orderedLibraries[i];
  file.write(`${library.id} ${library.libraryBooks.length}`);
  file.write('\r\n');

  file.write(library.libraryBooks.map(d => d.id).join(' '));
  file.write('\r\n');

}

file.end();