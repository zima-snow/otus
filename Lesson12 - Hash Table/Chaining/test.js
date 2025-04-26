import HashTable from './HashTable.js';

const checkSimpleSetAndGet = () => {
  const ht = new HashTable();

  console.log('Checking set:');
  console.log('Set "name: Alice"');
  console.log('Set "age: 25"\n');

  ht.set('name', 'Alice');
  ht.set('age', 25);

  console.log('Checking get:');

  console.log(`Current "name" is ${ht.get('name')}`);
  console.log(`Current "age" is ${ht.get('age')}\n`);
};

const checkSimpleDelete = () => {
  console.log('Checking delete:');

  const ht = new HashTable();

  console.log('Set "name: Alice"');
  console.log('Set "age: 25"\n');

  ht.set('name', 'Alice');
  ht.set('age', 25);

  console.log(`Current "name: is ${ht.get('name')}`);
  console.log(`Current "age" is ${ht.get('age')}\n`);

  console.log('Delete "name"');
  ht.delete('name');
  console.log(`HashTable has "name": ${ht.has('name')}`);
  console.log(`HashTable has "age": ${ht.has('age')}\n`);
};

const checkResolvingCollisions = () => {
  console.log('Checking resolving collisions:');

  const ht = new HashTable();

  console.log('Set "name: Alice"');
  ht.set('name', 'Alice');
  console.log('Set "eman: Alex"');
  ht.set('eman', 'Alex');
  console.log(`Current name is ${ht.get('name')}`);
  console.log(`Current eman is ${ht.get('eman')}\n`);

  console.log('Checking delete "eman: Alex" and get "name: Alice":');
  console.log('Delete eman');
  ht.delete('eman');

  console.log(`HashTable has "eman": ${ht.has('eman')}`);
  console.log(`HashTable has "name": ${ht.has('name')}\n`);
};

const checkRehash = () => {
  console.log('Checking rehash');
  console.log('Create HashTable with size 5 and loadFactor 0.6:');

  const ht = new HashTable(5, 0.6);

  console.log('Set "a: 1", "b: 2"');
  ht.set('a', 1);
  ht.set('b', 2);

  console.log(
    'Set "c: 3" - after this, HashTable will call rehash - 3/5 = 0.6 >= 0.6'
  );
  ht.set('c', 3);

  console.log('Set "d: 4", "e: 5"');
  ht.set('d', 4);
  ht.set('e', 5);

  console.log('Get value by "a" key');
  console.log(ht.get('a'));

  console.log('New size checking\n');
  console.log(ht.size);
};

const checkLazyDelete = () => {
  console.log('Checking lazy delete');

  const table = new HashTable();
  console.log('Set "a: 1"');
  table.set('a', 1);

  console.log('Delete "a: 1"');
  table.delete('a');

  console.log(`HashTable has "a": ${table.has('a')}`);

  console.log('Check that "a" exists inside table');

  console.log(`const index = table.hash("a", table.size);`);
  const index = table.hash('a', table.size);

  console.log(`const node = table.table[index];`);
  const node = table.table[index];

  console.log(`node is exists: ${node !== null}`);
  console.log(`node is marked as deleted: ${node.isDeleted}\n`);
};

const checkCleanUp = () => {
  console.log('Checking clean up');

  const table = new HashTable();

  console.log('Set "a: 1", "b: 2"');
  table.set('a', 1);
  table.set('b', 2);

  console.log('Delete "a: 1"');
  table.delete('a');

  console.log(`table.deletedCount is ${table.deletedCount}`);
  console.log(`table.count is ${table.count}`);

  console.log('Call table clean up');
  table.cleanUp();

  console.log(`table.deletedCount is ${table.deletedCount}`);
  console.log(`table.count is ${table.count}`);
  const isHas = table.table.some((bucket) => bucket?.key === 'a');
  console.log(`table.table.some(bucket => bucket?.key === 'a') is ${isHas}`);
};

const test = () => {
  checkSimpleSetAndGet();
  checkSimpleDelete();
  checkResolvingCollisions();
  checkRehash();
  checkLazyDelete();
  checkCleanUp();
};

test();
