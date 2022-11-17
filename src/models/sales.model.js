// const snakeize = require('snakeize');
const connection = require('./connection');

// const addNewSale = async (sale) => {
//   const columns = Object.keys(sale).join(', ');

//   const placeHolders = Object.keys(sale)
//     .map((_key) => '?')
//     .join(', ');

//   const [{ insertId }] = await connection.execute(
//     `INSERT INTO StoreManager.sales_products(${columns}) () VALUES ${placeHolders}`,
//     [...Object.values(sale)],
//   );

//   return insertId;
// };

const addNewSale = async (sales) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );

  const [[{ highestId }]] = await connection.execute(
    'SELECT MAX(sale_id) AS highestId FROM StoreManager.sales_products',
  );

  const nextId = highestId + 1;

  const addNewSales = sales.map(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [nextId, productId, quantity],
    );
  });

  await Promise.all(addNewSales);

  return nextId;
};

module.exports = {
  addNewSale,
};
