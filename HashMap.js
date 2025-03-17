// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

function HashMap(capacity = 16) {
  let size = 0;
  let loadFactor = 0.75;
  let buckets = new Array(capacity).fill(null); // Initialize buckets with null

  function Node(key, value) {
    return {
      key,
      value,
      next: null,
    };
  }

  // Initialize each bucket as an empty array to handle collisions

  //hash(key) takes a key and produces a hash code with it
  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function grow() {
    const oldBuckets = buckets;
    capacity *= 2;
    buckets = new Array(capacity).fill(null);
    size = 0;

    // Rehash all existing entries
    for (let i = 0; i < oldBuckets.length; i++) {
      let current = oldBuckets[i];
      while (current) {
        set(current.key, current.value);
        current = current.next;
      }
    }
  }

  //takes two arguments: the first is a key, and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten.
  function set(key, value) {
    if (size / capacity >= loadFactor) {
      grow();
    }

    const index = hash(key);
    const newNode = Node(key, value);

    // If bucket is empty
    if (!buckets[index]) {
      buckets[index] = newNode;
      size++;
      return;
    }

    let current = buckets[index];

    // If key exists, update value
    if (current.key === key) {
      current.value = value;
      return;
    }

    // Check the rest of the linked list
    while (current.next) {
      if (current.next.key === key) {
        current.next.value = value;
        return;
      }
      current = current.next;
    }

    // Add new node to end of list
    current.next = newNode;
    size++;
  }

  // takes one argument as a key and returns the value
  function get(key) {
    const index = hash(key);
    let current = buckets[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }

    return null;
  }

  // has(key) takes a key as an argument and returns true or false
  function has(key) {
    return get(key) !== null;
  }

  //remove(key) takes a key as an argument and removes the entry or returns false.
  function remove(key) {
    const index = hash(key);
    let current = buckets[index];

    // If key is at head of list
    if (current && current.key === key) {
      buckets[index] = current.next;
      size--;
      return true;
    }

    // Check rest of list
    while (current && current.next) {
      if (current.next.key === key) {
        current.next = current.next.next;
        size--;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  // length() returns the number of stored keys in the hash map.
  function length() {
    return size;
  }

  //clear() removes all entries in the hash map.
  function clear() {
    buckets = new Array(capacity).fill(null);
    size = 0;
  }

  //keys() returns an array containing all the keys inside the hash map.
  function keys() {
    let keysArray = [];
    for (let i = 0; i < buckets.length; i++) {
      let bucket = buckets[i];
      for (let j = 0; j < bucket.length; j++) {
        keysArray.push(bucket[j].key);
        bucket = bucket.next;
      }
    }
    return keysArray;
  }
  //values() returns an array containing all the values.
  function values() {
    let valuesArray = [];
    for (let i = 0; i < buckets.length; i++) {
      let bucket = buckets[i];
      for (let j = 0; j < bucket.length; j++) {
        valuesArray.push(bucket[j].value);
      }
    }
    return valuesArray;
  }

  //entries() returns an array that contains each key, value pair.
  function entries() {
    let entriesArray = [];
    for (let i = 0; i < buckets.length; i++) {
      let bucket = buckets[i];
      for (let j = 0; j < bucket.length; j++) {
        entriesArray.push([bucket[j].key, bucket[j].value]);
      }
    }
    return entriesArray;
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    buckets,
  };
}
let map = new HashMap();
map.set("apple", "red");
map.set("orange", "orange");
map.set("pineapple", "yellow");
console.log(map.buckets);
console.log(map.keys());
console.log(map.entries());
