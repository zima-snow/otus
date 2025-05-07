import Trie from './junior.js';
import TrieMap from './middle.js';

const main = () => {
  const trie = new Trie();

  trie.insert("apple");
  console.log(trie.search("apple"));
  console.log(trie.search("app"));
  console.log(trie.startsWith("app"));

  trie.insert("app");
  console.log(trie.search("app"));

  trie.remove("apple");
  console.log(trie.search("apple"));
  console.log(trie.search("app"));

  console.log("------------");

  const map = new TrieMap();
  map.insert("apple", 5);
  map.insert("app", 10);
  map.insert("banana", 7);
  
  console.log(map.get("apple"));
  console.log(map.get("app"));
  console.log(map.get("ban"));
  
  console.log(map.has("app"));
  console.log(map.has("ban"));
  console.log(map.has("ora"));
  
  map.remove("app");
  console.log(map.get("app"));
  console.log(map.get("apple"));
};

main();
