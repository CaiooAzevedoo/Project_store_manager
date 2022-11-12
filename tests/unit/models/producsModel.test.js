const { expect } = require('chai');
const sinon  = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const {products, product} = require('./mocks/producsModels.mock')

describe('Testa a camada model de Products', function () {
  afterEach(sinon.restore);

  it('Valida se o endpoint criado devolve', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const queryResult = await productsModel.getAll();
    expect(queryResult).to.be.deep.equal(products);
  });

  it('Valida se é possível listar apenas um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[product]]);
    const queryResult = await productsModel.getById(3);
    expect(queryResult).to.be.deep.equal(product);
  });
});
