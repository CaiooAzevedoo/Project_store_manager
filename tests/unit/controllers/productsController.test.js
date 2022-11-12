const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { products, product } = require('../mocks/producsModels.mock');
const productsController = require('../../../src/controllers/products.controller')

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a camada controller de products', function () {
  this.afterEach(sinon.restore);

  it('Valida se o endpoint criado devolve a lista de produts', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getAll').resolves(products);
    await productsController.productsList(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  })

  it('Valida se é possível listar apenas um produto pelo id', async function () {
    const req = { params: { id: 3 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getById').resolves(product);
    await productsController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(product);
  });

  it('Valida se um erro é retornado ao inserir um id invalido', async function () {
    const req = { params: { id: 13 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getById').resolves({
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    });
    await productsController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({
      message: 'Product not found',
    });
  });
});
