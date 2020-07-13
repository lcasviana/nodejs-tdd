const expect = require('chai').expect;

const { getAll, getById, insert } = require('../../controllers/products');

const req = {
  body: {},
  params: {},
};

const res = {
  jsonCalledWith: {},
  json(arg) { this.jsonCalledWith = arg; }
}

describe('products', () => {

  describe('getAll', () => {
    it('success', () => {
      getAll(req, res);
      expect(res.jsonCalledWith).to.be.eql({ title: 'Products page' });
    });
    it('internal error', () => {
      getAll(req, res);
    });
  });

  describe('getById', () => {
    it('success', () => {
      const r = { ...req };
      r.params = { id: '5f06669b47405a1a7854439b' };
      getById(r, res);
      expect(res.jsonCalledWith).to.be.have.key('success');
    });
    it('not found', () => {
      const r = { ...req };
      r.params = { id: 'not found' };
      getById(r, res);
      expect(res.jsonCalledWith).to.be.have.key('success');
    });
  });

});
