import SearchFullScan from './SearchFullScan.js';
import BoyerMoore from './BoyerMoore.js';

const TEXTS = ["KOLKOKOLOKOLL", "BC-ABC-BC-AC-ABCBC-ABC-BC-C-ABC-ABC-BC-C-ABC", "ABCD"];
const MASKS = ["KOLOKOL", "BC-ABC-BC-C-ABC", "1"];

const main = () => {
  const searches = new Array(2);

  searches[0] = new SearchFullScan(TEXTS[0], MASKS[0], 'SearchFullScan');
  searches[1] = new BoyerMoore(TEXTS[0], MASKS[0], 'BoyerMoore');

  console.log(`TEXTS is ${TEXTS.join(', ')}`);
  console.log(`MASKS is ${MASKS.join(', ')}`);

  for (let i = 0; i < searches.length; i++) {
    if (searches[i] == null) {
      break
    }

    console.log("---------------------------------------");
    console.log(`Current algorithm - ${searches[i].name}`);

    for (let n = 0; n <= TEXTS.length - 1; n += 1) {
      searches[i].text = TEXTS[n];
      searches[i].mask = MASKS[n];

      console.time(`Search of substring ${searches[i].mask} in string ${searches[i].text}`);
      const position = searches[i].run();
      console.timeEnd(`Search of substring ${searches[i].mask} in string ${searches[i].text}`);

      console.log(`Position: ${position}`);
      console.log(`Count of compares: ${searches[i].cmp}\n`);
    }
   }
};

main();
