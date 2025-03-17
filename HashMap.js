// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

function HashMap(capacity = 16) {
  let loadFactor = 0.75;
  let buckets = new Array(capacity);

  //hash(key) takes a key and produces a hash code with it
  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  //takes two arguments: the first is a key, and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten.
  function set(key, value) {
    let index = hash(key);
    buckets[index] = value;
  }

  // takes one argument as a key and returns the value
  function get(key) {
    let index = hash(key);
    return buckets[index] || null;
  }

  // has(key) takes a key as an argument and returns true or false
  function has(key) {
    return get(key) === null ? false : true;
  }

  return { set, get, has, buckets };
}
let map = new HashMap();
map.set("apple", "red");
map.set("orange", "orange");
map.set("banana", "yellow");
console.log(map.has("apple"));
