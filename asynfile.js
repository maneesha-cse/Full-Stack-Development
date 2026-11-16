import fs from "fs"; 

const data = 'Hello,This is a sample Text to demonstrate file operation in Node.js'; 

console.log(1); 

fs.writeFile("Sample.txt", data, (err) => { 
    if (err) { 
        return console.log(err.message); 
    } 
    console.log("Created asynchronous file"); 

    fs.readFile("Sample.txt", "utf-8", (err, readdata) => { 
        if (err) throw err; // Fixed: Changed 'Throw' to 'throw'
        console.log(readdata); 

        const a = "\nwelcome to sample-1 file"; // Fixed: Removed stray backslash
        
        fs.appendFile("Sample.txt", a, (err) => { 
            if (err) throw err; // Fixed: Changed 'Throw' to 'throw'
            console.log("This file appended"); 
        }); 
    }); 
});
console.log(2);
console.log("The end of fileops");