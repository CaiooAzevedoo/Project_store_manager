const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const salesService = require("../../../src/services/sales.service");
const salesMock= require("../mocks/sales.mock");
const salesController = require("../../../src/controllers/sales.controller");


const { expect } = chai;
chai.use(sinonChai);

describe('Testa a camada controller de sales', function () {
this.afterEach(sinon.restore);

  it("Valida se é possível cadastrar uma venda", async function () {
    const req = { params: { id: 4 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "insertSale").resolves(salesMock.newSale);
    await salesController.postSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith();
  });

});
