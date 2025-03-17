// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

function HashMap(capacity = 16) {
  let loadFactor = 0.75;
  // Initialize each bucket as an empty array to handle collisions
  let buckets = new Array(capacity).fill().map(() => []);

  //hash(key) takes a key and produces a hash code with it
  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  // Helper function to find entry index in a bucket
  function findEntry(key) {
    const index = hash(key);
    const bucket = buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return { bucketIndex: index, entryIndex: i };
      }
    }
    return null;
  }

  //takes two arguments: the first is a key, and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten.
  function set(key, value) {
    const found = findEntry(key);
    //Update value if found
    if (found) {
      buckets[found.bucketIndex][found.entryIndex].value = value;
    } else {
      //If key wasn't found, add new entry
      const index = hash(key);
      buckets[index].push({ key, value });
    }
  }
  // takes one argument as a key and returns the value
  function get(key) {
    const found = findEntry(key);
    return found ? buckets[found.bucketIndex][found.entryIndex].value : null;
  }

  // has(key) takes a key as an argument and returns true or false
  function has(key) {
    return get(key) !== null;
  }

  //remove(key) takes a key as an argument and removes the entry or returns false.
  function remove(key) {
    const found = findEntry(key);

    if (found) {
      buckets[found.bucketIndex].splice(found.entryIndex, 1);
      return true;
    }
    return false;
  }

  // length() returns the number of stored keys in the hash map.
  function length() {
    let total = 0;
    for (let i = 0; i < buckets.length; i++) {
      total += buckets[i].length;
    }
    return total;
  }

  //clear() removes all entries in the hash map.
  function clear() {
    buckets = new Array(capacity).fill().map(() => []);
  }

  return { set, get, has, remove, length, clear, buckets };
}
let map = new HashMap();
map.set("apple", "red");
map.set("orange", "orange");
map.set("pineapple", "yellow");
console.log(map.buckets);
map.clear();
console.log(map.buckets);
