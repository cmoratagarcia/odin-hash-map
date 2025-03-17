export default function HashMap(capacity = 16) {
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

  //Takes a key and produces a hash code with it
  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }
  //Double the capacity
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

  //Takes two arguments: the first is a key, and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten.
  function set(key, value) {
    if (size / capacity >= loadFactor) {
      grow(); //Grow when load factor is reached
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

  // Takes a key as and argument and returns the value
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

  // Takes a key as an argument and returns true or false
  function has(key) {
    return get(key) !== null;
  }

  // Takes a key as an argument and removes the entry or returns false
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

  // Returns the number of stored keys in the hash map
  function length() {
    return size;
  }

  // Removes all entries in the hash map
  function clear() {
    buckets = new Array(capacity).fill(null);
    size = 0;
  }

  // Returns an array containing all the keys inside the hash map
  function keys() {
    let keysArray = [];
    for (let i = 0; i < buckets.length; i++) {
      let current = buckets[i];
      while (current) {
        keysArray.push(current.key);
        current = current.next;
      }
    }
    return keysArray;
  }
  // Returns an array containing all the values
  function values() {
    let valuesArray = [];
    for (let i = 0; i < buckets.length; i++) {
      let current = buckets[i];
      while (current) {
        keysArray.push(current.value);
        current = current.next;
      }
    }
    return valuesArray;
  }

  // Returns an array that contains each key, value pair
  function entries() {
    let entriesArray = [];
    for (let i = 0; i < buckets.length; i++) {
      let current = buckets[i];
      while (current) {
        entriesArray.push(current.key, current.value);
        current = current.next;
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
  };
}
