function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("World"));
module.exports = greet;

const _ = require("lodash");

const name = "World";
console.log(_.upperCase(`hello ${name}`));