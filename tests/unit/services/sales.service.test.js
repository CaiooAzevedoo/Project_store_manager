// const { expect } = require("chai");
// const sinon = require("sinon");
// const salesModel = require("../../../src/models/sales.model");
// const salesService = require('../../../src/services/sales.service');
// const salesMock = require("../mocks/sales.mock");

// describe("Testa camada service de sales", function () {
//  afterEach(sinon.restore);

//   it("Valida se é possível cadastra uma nova venda", async function () {
//     sinon.stub(salesModel, "addNewSale").resolves(3);
//     const result = await salesService.insertSale(salesMock.newSale);
//     expect(result).to.be.deep.equal({
//       id: 3,
//       itemsSold: [salesMock.newSale],
//     });
//   });

//   it("Valida se um erro é retornado ao realizar um cadastro de venda errada", async function () {
//     sinon.stub(salesModel, "addNewSale").resolves(undefined);
//     const result = await salesService.insertSale("xablau");
//     expect(result).to.be.deep.equal({
//       type: "SALE_INVALID",
//       message: "Product not found",
//     });
//   });

// });
