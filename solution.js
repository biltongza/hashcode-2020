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

const books = Number(R.split(' ', firstRow)[0]);
const numberOfLibraries = Number(R.split(' ', firstRow)[1]);
const daysOfScanning = Number(R.split(' ', firstRow)[2]);

const scoresOfBooks = R.split('\n', contents)[1];


const libraries = [];

for (let i = 2; i <= (numberOfLibraries + 2) ; i += 2){
  const library = {
    libraryDetails: R.split('\n', contents)[i],
    libraryBooks: R.split('\n', contents)[i + 1]
  }

  libraries.push(library);
}


// var file = fs.createWriteStream(someOutputFileName);

// file.on('error', function(err) { /* error handling */ });

// file.write(someData);

// file.end();