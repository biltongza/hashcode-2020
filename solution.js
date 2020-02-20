let fs = require('fs');
let R = require('ramda');



var contents = fs.readFileSync(someFileName, 'utf8');



var file = fs.createWriteStream(someOutputFileName);

file.on('error', function(err) { /* error handling */ });

file.write(someData);

file.end();