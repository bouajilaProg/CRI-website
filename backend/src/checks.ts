function testNumber(qte: number) {
  if (isNaN(qte)) {
    throw new Error("Invalid number");
  }
}

export { testNumber };
