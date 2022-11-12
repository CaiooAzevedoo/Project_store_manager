const { expect } = require('chai');
const sinon  = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const {products, product} = require('./mocks/producsModels.mock')

describe('Testa a camada model de Producs', function () {
  afterEach(sinon.restore);

  it('Valida se o endpoint criado devolve', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const queryResult = await productsModel.getAll();
    expect(queryResult).to.be.deep.equal(products);
  });

})
