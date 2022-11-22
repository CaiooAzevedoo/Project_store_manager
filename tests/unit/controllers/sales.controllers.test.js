const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesService = require('../../../src/services/sales.service');
const salesMock= require('../mocks/sales.mock');
const salesController = require('../../../src/controllers/sales.controller');


const { expect } = chai;
chai.use(sinonChai);

describe('Testa a camada controller de sales', function () {
this.afterEach(sinon.restore);

  it('Valida se é possível cadastrar uma venda', async function () {
    const req = { params: { id: 4 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'insertSale').resolves(salesMock.newSale);
    await salesController.postSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith();
  });

  it('Valida se o endpoint criado devolve a lista de vendas', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getAllSales').resolves(salesMock.sales);
    await salesController.getListSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith();
  });


  it('Valida se é possível listar apenas uma venda pelo id', async function () {
    const req = { params: { id: 2 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getByIdSales').resolves(salesMock.sales[2]);
    await salesController.getSale(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json);
  });

  it('Valida se é possível deletar uma venda pelo id', async function () {
    const req = { params: { id: 2 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    sinon.stub(salesService, 'deleteByIdSale').resolves(salesMock.sales[2]);
    await salesController.deleteSale(req, res);

    sinon.assert.calledWith(res.status, 204);
    sinon.assert.calledWith(res.end);
  });

});


//  it('Valida se um erro é retornado ao realizar um cadastro de venda errada', async function () {
//    sinon.stub(salesModel, 'addNewSale').resolves(undefined);
//    const result = await salesService.insertSale('xablau');
//    expect(result).to.be.deep.equal({
//      type: 'SALE_INVALID',
//      message: 'Product not found',
//    });
//  });




