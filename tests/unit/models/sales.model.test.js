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

 it('Valida se o endpoint criado devolve a lista de vendas', async function () {
   sinon.stub(connection, 'execute').resolves([salesMock.sales]);
   const result = await salesModel.getAll();
   expect(result).to.be.deep.equal(salesMock.sales);
 });

 it('Valida se é possível listar apenas uma venda pelo id', async function () {
   sinon.stub(connection, 'execute').resolves([[salesMock.sales[2]]]);
   const [result] = await salesModel.getById(2);
   expect(result).to.be.deep.equal(salesMock.sales[2]);
 });

  it('Valida se é possível deletar uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.deleteSale(2);
    expect(result).to.be.deep.equal({id: 2});
 })

});
