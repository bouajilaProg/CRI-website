function testNumber(qte: number) {
  if (isNaN(qte)) {
    throw new Error("Invalid number");
  }
  if (qte <= 0) {
    throw new Error("number has to be more than 0");
  }
}

export { testNumber };
