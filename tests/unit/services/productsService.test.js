const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { products, product } = require('../../mocks/db.mock');
const { productsService } = require('../../../src/services');


describe('Testa a camada Service de Products', function () {
  afterEach(sinon.restore);

  it('Valida se o endpoint criado devolve a lista de produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(products);
    const queryResult = await productsService.getAll();
    expect(queryResult).to.be.deep.equal(products);
  });

  it('Valida se é possível listar apenas um produto pelo id', async function () {
    sinon.stub(productsModel, 'getById').resolves(product);
    const queryResult = await productsService.getById(3);
     expect(queryResult).to.be.deep.equal({type: null, message: product});
  });

  it('Valida se um erro é retornado ao inserir um id invaldo', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);
    const queryResult = await productsService.getById(13);
    expect(queryResult).to.be.deep.equal({
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    });
   });
});
