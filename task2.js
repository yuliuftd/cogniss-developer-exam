const jsonfile = require("jsonfile");
const randomstring = require("randomstring");
const got = require("got");

const inputURL = "http://www.nactem.ac.uk/software/acromine/dictionary.py?sf=";
const outputFile = "output3.json";

var output = {}
console.log("getting 10 acronyms");
output.definitions = [];
console.log("creating looping function")
const getAcronym = function() {
  var acronym = randomstring.generate(3).toUpperCase();
  got(inputURL+acronym).then(response => {
    console.log("got data for acronym", acronym);
    console.log("add returned data to definitions array");
    output.definitions.push(response.body);
    if (output.definitions.length < 10) {
      console.log("calling looping function again");
      getAcronym();
    }
  }).catch(err => {
    console.log(err)
  })
}
console.log("calling looping function");
getAcronym();
console.log("saving output file formatted with 2 space indenting");
jsonfile.writeFile(outputFile, output, {spaces: 2}, function(err) {
  console.log("All done!");
});