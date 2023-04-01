interface Data {
  order: number;
  barcode: string;
  item_name: string;
  item_tag: string;
  item_amount: number;
}

export const fakeData = (amount: number = 0) => {
  const cosmetics: Data[] = [];
  for (let i = 1; i <= amount; i++) {
    const barcode = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, "0");
    const name = `Cosmetic ${i}`;
    const tag = `Tag ${Math.floor(Math.random() * 10) + 1}`;
    const item_amount = Math.floor(Math.random() * 100) + 1;

    cosmetics.push({
      order: i,
      barcode: barcode,
      item_name: name,
      item_tag: tag,
      item_amount,
    });
  }
  return cosmetics;
};
