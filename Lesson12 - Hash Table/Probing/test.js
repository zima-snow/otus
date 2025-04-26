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

const checkLazyDelete = () => {
  console.log('Checking lazy delete');

  const table = new HashTable(5);
  console.log('Set "a: 1"');
  table.set('a', 1);

  console.log('Delete "a: 1"');
  table.delete('a');
  const deletedIndex = table.findSlot('a');

  console.log(`HashTable has "a": ${table.has('a')}`);
  console.log(`HashTable marked "a" as DELETED: ${table.table[deletedIndex] === table.DELETED}`);
};

const test = () => {
  checkSimpleSetAndGet();
  checkSimpleDelete();
  checkLazyDelete();
};

test();
