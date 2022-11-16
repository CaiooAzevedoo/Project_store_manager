const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const dbMock = require('../mocks/product.mock');
const productsService = require('../../../src/services/products.service');


describe('Testa a camada Service de Products', function () {
  afterEach(sinon.restore);

  it('Valida se o endpoint criado devolve a lista de produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(dbMock.products);
    const result = await productsService.getAllProducts(undefined);
    expect(result).to.be.deep.equal(dbMock.products);
  });

  it('Valida se é possível listar apenas um produto pelo id', async function () {
    sinon.stub(productsModel, "getById").resolves(dbMock.products[2]);
    const result = await productsService.getByIdProducts(3);
     expect(result).to.be.deep.equal({
       type: null,
       message: dbMock.product,
     });
  });

  it('Valida se um erro é retornado ao inserir um id invaldo', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);
    const result = await productsService.getByIdProducts(13);
    expect(result).to.be.deep.equal({
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    });
  });

    it('Valida se é possível cadastrar um produto', async function () {
      sinon.stub(productsModel, 'addNewProduct').resolves([{ insertId: 4 }])
      sinon.stub(productsModel, 'getById').resolves(dbMock.newProduct)
    const result = await productsService.insertProduct(dbMock.newProduct);
     expect(result).to.be.deep.equal({
       type: null,
       message: dbMock.newProduct,
     });
    });

    it("Valida se um erro é retornado ao inserir um nome invaldo", async function () {
      sinon.stub(productsModel, "addNewProduct").resolves([{ insertId: 'xablau' }]);
       sinon.stub(productsModel, "getById").resolves(undefined);
      const result = await productsService.insertProduct('xablau');
      expect(result).to.be.deep.equal({
        type: 'PRODUCT_NOT_FOUND',
        message: 'Invalid name',
      });
    });
});
