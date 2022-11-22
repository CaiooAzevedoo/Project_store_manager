const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const salesMock = require('../mocks/sales.mock');

describe('Testa camada service de sales', function () {
 afterEach(sinon.restore);

  it('Valida se é possível cadastra uma nova venda', async function () {
    sinon.stub(salesModel, 'addNewSale').resolves(4);
    const result = await salesService.insertSale(salesMock.newSale);
    expect(result).to.be.deep.equal({
      id: 4,
      itemsSold: salesMock.newSale,
      type: null,
    });
  });

  it('Valida se um erro é retornado ao realizar um cadastro de venda errada', async function () {
    sinon.stub(salesModel, 'addNewSale').resolves(undefined);
    const result = await salesService.insertSale('xablau');
    expect(result).to.be.deep.equal({
      type: 'SALE_INVALID',
      message: 'Product not found',
    });
  });

  it('Valida se o endpoint criado devolve a lista de vendas', async function () {
    sinon.stub(salesModel, 'getAll').resolves(salesMock.sales);
    const result = await salesService.getAllSales(undefined);
    expect(result).to.be.deep.equal({
      type: null,
      message: salesMock.sales,
    });
  });

  it('Valida se é possível listar apenas uma venda pelo id', async function () {
    sinon.stub(salesModel, 'getById').resolves(salesMock.sales[2]);
    const result = await salesService.getByIdSales(2);
    expect(result).to.be.deep.equal({
      type: null,
      message: salesMock.sales[2],
    });
  });


  it('Valida se é possível deletar uma venda pelo id', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves({id: 2});
    const result = await salesService.deleteByIdSale(2);
    expect(result).to.be.deep.equal({
      type: null,
      message: {id: 2},
    });
  });

});
