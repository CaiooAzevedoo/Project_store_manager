const { expect } = require('chai');
const sinon  = require('sinon');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const dbMock = require('../mocks/product.mock');

describe('Testa a camada model de Products', function () {
  afterEach(sinon.restore);

  it('Valida se o endpoint criado devolve a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([dbMock.products]);
    const result = await productsModel.getAll(undefined);
    expect(result).to.be.deep.equal(dbMock.products);
  });

  it('Valida se é possível listar apenas um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[dbMock.products[2]]]);
    const result = await productsModel.getById(3);
    expect(result).to.be.deep.equal(dbMock.products[2]);
  });

  it('Valida se é possível cadastrar um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }])
    const result = await productsModel.addNewProduct(dbMock.newProduct)
    expect(result).to.equal(4);
  });

  it('Valida se é possível deletar um produto', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await productsModel.deleteProduct(2);
    expect(result).to.be.deep.equal({ id: 2 });
  });
});
