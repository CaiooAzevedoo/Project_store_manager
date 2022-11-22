const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
const salesMock = require('../mocks/sales.mock');

describe('Testa camada model de sales', function () {
 afterEach(sinon.restore);

//  it('Cadastrando uma nova venda', async function () {
//    sinon.stub(connection, 'execute').resolves([salesMock.newSaleModel]);
//     const result = await salesModel.addNewSale(4,[salesMock.newSaleModel]);
//     expect(result).to.equal([4, salesMock.newSale]);
//  });

 it('Valida se o endpoint criado devolve a lista de produtos', async () => {
   sinon.stub(connection, "execute").resolves([salesMock.sales]);
   const result = await salesModel.getAll();
   expect(result).to.be.deep.equal(salesMock.sales);
 });

 it('Valida se é possível listar apenas um produto pelo id', async () => {
   sinon.stub(connection, "execute").resolves([[salesMock.sales[2]]]);
   const [result] = await salesModel.getById(2);
   expect(result).to.be.deep.equal(salesMock.sales[2]);
 });

});
