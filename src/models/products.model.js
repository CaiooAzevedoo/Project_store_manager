const Connection = require('mysql2/typings/mysql/lib/Connection');

const getAll = async () => {
  const [products] = await Connection.execute(
    `SELECT * FROM StoreManager.products
    ORDER BY id`,
  );

  return products;
};

const getById = async (productId) => {
  const [{ product }] = await Connection.execute(
    `SELECT * FROM StoreManager.products
    WHER id = ?`,
    [productId],
  );

  return product;
};

module.exports = {
  getAll,
  getById,
};
