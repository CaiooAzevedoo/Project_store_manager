const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );

  return products;
};

// async function getAll() {
//   const [products] = await connection.execute(
//     'SELECT * FROM StoreManager.products ORDER BY id',
//   );

//   return products.resolves();
// }

const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );

  return product;
};

module.exports = {
  getAll,
  getById,
};
