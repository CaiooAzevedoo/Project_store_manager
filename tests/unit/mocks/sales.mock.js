const newSale = [
  {
    id: 4,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  },
];

const sales = [
  {
    saleId: 1,
    date: '2022-10-14T19:51:29.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2022-10-14T19:51:29.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2022-10-14T19:51:29.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleById =
  {
  saleId: 2,
  date: '2022-10-14T19:51:29.000Z',
  productId: 3,
  quantity: 15,
  };

module.exports = {
  newSale,
  sales,
  saleById,
};
