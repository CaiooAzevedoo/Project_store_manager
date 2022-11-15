// const snakeize = require('snakeize');
const connection = require('./connection');

const insertSale = async (sale) => {
  const columns = Object.keys(sale).join(', ');

  const placeHolders = Object.keys(sale)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products(${columns}) () VALUES ${placeHolders}`,
    [...Object.values(sale)],
  );

  return insertId;
};

// const newSale = async (sales) => {
//   await connection.execute(
//     'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
//   );

//   const [[{ highestId }]] = await connection.execute(
//     'SELECT MAX(sale_id) AS lastSaleId FROM StoreManager.sales_products',
//   );

//   const nextId = highestId + 1;

//   const newSales = sales.map(async ({ productId, quantity }) => {
//     await connection.execute(
//       'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
//       [nextId, productId, quantity],
//     );
//   });

//   await Promise.all(newSales);

//   return nextId;
// };

module.exports = {
  insertSale,
};
