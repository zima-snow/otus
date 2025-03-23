const POSITIONS = {
  0: 'A1',
  1: 'B1',
  2: 'C1',
  3: 'D1',
  4: 'E1',
  5: 'F1',
  6: 'G1',
  7: 'H1',
  8: 'A2',
  9: 'B2',
  10: 'C2',
  11: 'D2',
  12: 'E2',
  13: 'F2',
  14: 'G2',
  15: 'H2',
  16: 'A3',
  17: 'B3',
  18: 'C3',
  19: 'D3',
  20: 'E3',
  21: 'F3',
  22: 'G3',
  23: 'H3',
  24: 'A4',
  25: 'B4',
  26: 'C4',
  27: 'D4',
  28: 'E4',
  29: 'F4',
  30: 'G4',
  31: 'H4',
  32: 'A5',
  33: 'B5',
  34: 'C5',
  35: 'D5',
  36: 'E5',
  37: 'F5',
  38: 'G5',
  39: 'H5',
  40: 'A6',
  41: 'B6',
  42: 'C6',
  43: 'D6',
  44: 'E6',
  45: 'F6',
  46: 'G6',
  47: 'H6',
  48: 'A7',
  49: 'B7',
  50: 'C7',
  51: 'D7',
  52: 'E7',
  53: 'F7',
  54: 'G7',
  55: 'H7',
  56: 'A8',
  57: 'B8',
  58: 'C8',
  59: 'D8',
  60: 'E8',
  61: 'F8',
  62: 'G8',
  63: 'H8',
}

class King {
  bb = BigInt(0);

  constructor(positionNumber) {
    let s = POSITIONS[positionNumber];
    s = s.toUpperCase();

    const charCode1 = s[0].charCodeAt(0);
    const charCode2 = 'A'.charCodeAt(0);

    const difference = Math.abs(charCode1 - charCode2);

    let point = BigInt(difference + (s[1] - '1') * 8);

    this.bb = 1n << point;
  }

  steps = () => {
    let mask = (this.bb & 0x7F7F7F7F7F7F7F7Fn) << 1n;
    mask |= (this.bb & 0xFEFEFEFEFEFEFEFEn) >> 1n;
    mask |= (this.bb << 8n);
    mask |= this.bb >> 8n;
    mask |= (this.bb & 0xFEFEFEFEFEFEFEFEn) >> 9n;
    mask |= (this.bb & 0xFEFEFEFEFEFEFEFEn) << 7n;
    mask |= (this.bb & 0x7F7F7F7F7F7F7F7Fn) << 9n;
    mask |= (this.bb & 0x7F7F7F7F7F7F7F7Fn) >> 7n;
    this.bb = mask;
  };

  countUnitsInBinary = (n) => {
    let count = 0;
    const binaryString = n.toString(2);

    for (let char of binaryString) {
      if (char === '1') {
        count++;
      }
    }

    return count;
  };

  print = () => {
    const movesCount = this.countUnitsInBinary(this.bb);

    console.log(`Count of king's moves: ${movesCount}`);
    console.log(`Bitmask of all possible king's moves: ${this.bb}`);
  }
}

export default King;
