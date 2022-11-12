const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );

  return products;
};

const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );

  return product;
};

const insertProducts = async (productName) => {
  const [{ insertProductId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE ?',
    [productName],
  );
  return insertProductId;
};

module.exports = {
  getAll,
  getById,
  insertProducts,
};
