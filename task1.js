const jsonfile = require("jsonfile");
const randomstring = require("randomstring");
const got = require("got");

const inputFile = "input2.json";
const outputFile = "output2.json";

//an empty object
const output = {}
//an empty array
output.emails = [];
const genEmail = () => {
    jsonfile.readFile(inputFile, function(err, body){
        //assign the names Array to list
        let list = body.names
        // loop 
        for (x in list) {
            //reverse each one and the add string, then push into emails
            output.emails.push(list[x].split("").reverse().join("") + randomstring.generate(5) + '@gmail.com')
        }
        // check if push successfully
        console.log(output.emails)
        //store them into json file
        jsonfile.writeFile(outputFile, output, {spaces: 2}, function(err){
            //show info when finish write file
            console.log("All done!")
        })
    })
}

// call the function
genEmail();