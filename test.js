import HashMap from "./HashMap.js";

const test = HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.entries());
console.log(test.length());
test.set("jacket", "NEW COLOR");
test.set("kite", "NEW COLOR");
test.set("lion", "NEW COLOR");

test.set("moon", "silver");
console.log(test.get("moon")); // silver
console.log(test.length()); // 13
console.log(test.keys());
console.log(test.values());

test.remove("kite");
console.log(test.length()); // 12
console.log(test.has("avocado")); // false
