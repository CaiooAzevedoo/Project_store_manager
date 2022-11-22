const connection = require('./connection');

const addNewSale = async (sales) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );

  const [[{ highestId }]] = await connection.execute(
    'SELECT MAX(sale_id) highestId FROM StoreManager.sales_products',
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

const getAll = async () => {
  const [sale] = await connection.execute(
  ` SELECT sales_products.sale_id saleId,
    sales.date,
    sales_products.product_id productId,
    sales_products.quantity
    FROM sales_products
    INNER JOIN sales
    ON sales.id = sales_products.sale_id
    ORDER BY sales_products.sale_id, sales_products.product_id;`,
  );

  return sale;
};

const getById = async (id) => {
  const [sale] = await connection.execute(
  ` SELECT sales.date, sales_products.product_id productId, sales_products.quantity
    FROM sales_products
    INNER JOIN sales ON sales.id = sales_products.sale_id
    WHERE sales_products.sale_id = ?
    ORDER BY sales_products.sale_id, sales_products.product_id`,
    [id],
  );
  return sale;
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );

  return { id };
};

const updateSale = async (id, { quantity, productId }) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, id, productId],
  );

  return { id, quantity, productId };
};

module.exports = {
  addNewSale,
  getAll,
  getById,
  deleteSale,
  updateSale,
};
