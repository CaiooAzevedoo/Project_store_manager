const { expect } = require('chai');
const sinon  = require('sinon');
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const dbMock = require("../mocks/db.mock");

describe('Testa a camada model de Products', function () {
  afterEach(sinon.restore);

  it('Valida se o endpoint criado devolve a lista de produtos', async function () {
    sinon.stub(connection, "execute").resolves([dbMock.products]);
    const queryResult = await productsModel.getAll();
    expect(queryResult).to.be.deep.equal(dbMock.products);
  });

  it('Valida se é possível listar apenas um produto pelo id', async function () {
    sinon.stub(connection, "execute").resolves([[dbMock.product]]);
    const queryResult = await productsModel.getById(3);
    expect(queryResult).to.be.deep.equal(dbMock.product);
  });
});
