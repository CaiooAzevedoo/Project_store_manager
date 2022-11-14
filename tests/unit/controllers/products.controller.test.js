const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const productsService = require("../../../src/services/products.service");
const dbMock = require("../mocks/db.mock");
const productsController = require("../../../src/controllers/products.controller");

const { expect } = chai;
chai.use(sinonChai);

describe("Testa a camada controller de products", function () {
  this.afterEach(sinon.restore);

  it("Valida se o endpoint criado devolve a lista de produts", async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, "getAllProducts").resolves(dbMock.products);
    await productsController.productsList(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(dbMock.products);
  });

  it("Valida se é possível listar apenas um produto pelo id", async function () {
    const req = { params: { id: 3 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, "getByIdProducts").resolves(dbMock.product);
    await productsController.getProduct(req, res);

    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json);
  });

  it("Valida se um erro é retornado ao inserir um id invalido", async function () {
    const req = { params: { id: 13 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, "getByIdProducts").resolves({
      type: "PRODUCT_NOT_FOUND",
      message: "Product not found",
    });
    await productsController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({
      message: "Product not found",
    });
  });

  it("Valida se é possível cadastrar um produto", async function () {
    const req = { body: { name: 'Produto1' } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, "insertProduct").resolves(dbMock.newProduct);
    await productsController.postProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith();

  });

  // it("Valida se um erro é retornado ao inserir nome invalido", async function () {
  //   const req = { body: { name: xablau } };
  //   const res = {};
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

  //   sinon.stub(productsService, "insertProduct").resolves({
  //     type: "NAME_IS_REQUIRED",
  //     message: "Invalid name",
  //   });
  //   await productsController.postProduct(req, res);

  //   expect(res.status).to.have.been.calledWith(404);
  //   expect(res.json).to.have.been.calledWith({
  //     message: "Invalid name",
  //   });
  // });

});
