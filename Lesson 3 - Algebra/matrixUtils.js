class MatrixUtils {
  multiply = (m1, m2) => {
    const result = [];
    const mLength = m1.length;
  
    for (let m1RowIndex = 0; m1RowIndex < mLength; m1RowIndex += 1) {
      const row = [];
      let m2RowIndex = 0;

      while (m2RowIndex < mLength) {
        let sum = 0;

        for (let colIndex = 0; colIndex < mLength; colIndex += 1) {
          sum += m1[m1RowIndex][colIndex] * m2[colIndex][m2RowIndex];
        }

        row.push(sum);
        m2RowIndex += 1;
      }

      result.push(row);
    }

    return result;
  };

  getIdentityMatrix = (size) => {
    const identityMatrix = [];

    for (let i = 0; i < size; i += 1) {
      let row = [];

      for (let j = 0; j < size; j += 1) {
        const item = i === j ? 1 : 0;
        row.push(item);
      }

      identityMatrix.push(row);
    }

    return identityMatrix;
  };

  pow = (m, n) => {
    if (n === 0) {
      return this.getIdentityMatrix(n);
    }

    if (n === 1) {
      return m;
    }
  
    if (n % 2 === 0) {
      const result = this.pow(m, n / 2);
      return this.multiply(result, result);
    }
  
    return this.multiply(this.pow(m, n - 1), m);
  };
};

export default MatrixUtils;
