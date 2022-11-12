const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const dbMock = require('../mocks/db.mock');
const productsService = require('../../../src/services/products.service');


describe('Testa a camada Service de Products', function () {
  afterEach(sinon.restore);

  it('Valida se o endpoint criado devolve a lista de produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(dbMock.products);
    const queryResult = await productsService.getAllProducts();
    expect(queryResult).to.be.deep.equal(dbMock.products);
  });

  it('Valida se é possível listar apenas um produto pelo id', async function () {
    sinon.stub(productsModel, "getById").resolves(dbMock.product);
    const queryResult = await productsService.getByIdProducts(3);
     expect(queryResult).to.be.deep.equal({
       type: null,
       message: dbMock.product,
     });
  });

  it('Valida se um erro é retornado ao inserir um id invaldo', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);
    const queryResult = await productsService.getByIdProducts(13);
    expect(queryResult).to.be.deep.equal({
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    });
   });
});
