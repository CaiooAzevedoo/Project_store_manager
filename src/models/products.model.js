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

const addNewProduct = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [productName],
  );

  return insertId;
};

const getAllId = async () => {
  const [ids] = await connection.execute(
    'SELECT id FROM StoreManager.products',
  );
  return ids;
};

const updateProduct = async (id, name) => {
   await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
     [name, id],
   );

  return { id, name };
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id =?',
    [id],
  );

  return { id };
};

module.exports = {
  getAll,
  getById,
  addNewProduct,
  getAllId,
  updateProduct,
  deleteProduct,
};
