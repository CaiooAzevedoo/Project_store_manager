// const connection = require('./connection');

// const newSale = async (sale) => {
//   const [{ newSaleId }] = await connection.execute(
//     'INSERT INTO StoreManager.sales VALUES()',
//     [sale],
//   );

//   const newSales = sale.map(async ({ productId, quantity }) => {
//     await connection.execute(
//       'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
//       [newSaleId, productId, quantity],
//     );
//   });

//   await Promise.all(newSales);

//   return newSaleId;
// };

// module.exports = {
//   newSale,
// };
