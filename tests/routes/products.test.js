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
    it('Success', () => {
      getAll(req, res);
      expect(res.jsonCalledWith).to.have.key('products');
      expect(res.jsonCalledWith.products.length).to.be.eql(5);
    });
    it('Not found', () => {
      getAll(req, res);
    });
    it('Internal error', () => {
      getAll(req, res);
    });
  });

  describe('getById', () => {
    it('Success', () => {
      const r = { ...req };
      r.params = { id: '5f06669b47405a1a7854439b' };
      getById(r, res);
      expect(res.jsonCalledWith).to.have.key('product');
    });
    it('Id invalid', () => {
      const r = { ...req };
      r.params = { id: null };
      getById(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Id invalid' });
    });
    it('Not found', () => {
      const r = { ...req };
      r.params = { id: 'not found' };
      getById(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Not found' });
    });
    it('Internal error', () => {
      getById(req, res);
    });
  });

  describe('insert', () => {
    it('Id invalid', () => {
      const r = { ...req };
      r.params = { id: null };
      r.body = { name: 'name', description: 'description', price: 1.1 };
      insert(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Id invalid' });
    });
    it('Name falsy', () => {
      const r = { ...req };
      r.params = { id: '5f06669b47405a1a7854439b' };
      r.body = { name: '', description: 'description', price: 1.1 };
      insert(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Name falsy' });
    });
    it('Name not string', () => {
      const r = { ...req };
      r.params = { id: '5f06669b47405a1a7854439b' };
      r.body = { name: true, description: 'description', price: 1.1 };
      insert(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Name not string' });
    });
    it('Name only whitespaces', () => {
      const r = { ...req };
      r.params = { id: '5f06669b47405a1a7854439b' };
      r.body = { name: '   ', description: 'description', price: 1.1 };
      insert(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Name only whitespaces' });
    });
    it('Description falsy', () => {
      const r = { ...req };
      r.params = { id: '5f06669b47405a1a7854439b' };
      r.body = { name: 'name', description: '', price: 1.1 };
      insert(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Description falsy' });
    });
    it('Description not string', () => {
      const r = { ...req };
      r.params = { id: '5f06669b47405a1a7854439b' };
      r.body = { name: 'name', description: 3, price: 1.1 };
      insert(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Description not string' });
    });
    it('Description only whitespaces', () => {
      const r = { ...req };
      r.params = { id: '5f06669b47405a1a7854439b' };
      r.body = { name: 'name', description: '          ', price: 1.1 };
      insert(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Description only whitespaces' });
    });
    it('Description length less than 10', () => {
      const r = { ...req };
      r.params = { id: '5f06669b47405a1a7854439b' };
      r.body = { name: 'name', description: 'd', price: 1.1 };
      insert(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Description length less than 10' });
    });
    it('Price falsy', () => {
      const r = { ...req };
      r.params = { id: '5f06669b47405a1a7854439b' };
      r.body = { name: 'name', description: 'description', price: 0 };
      insert(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Price falsy' });
    });
    it('Price not number', () => {
      const r = { ...req };
      r.params = { id: '5f06669b47405a1a7854439b' };
      r.body = { name: 'name', description: 'description', price: [] };
      insert(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Price not number' });
    });
    it('Price less equal 0', () => {
      const r = { ...req };
      r.params = { id: '5f06669b47405a1a7854439b' };
      r.body = { name: 'name', description: 'description', price: -1 };
      insert(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Price less equal 0' });
    });
    it('Conflict', () => {
      const r = { ...req };
      r.params = { id: '5f06669b47405a1a7854439b' };
      r.body = { name: 'name', description: 'description', price: 1.1 };
      insert(r, res);
      expect(res.jsonCalledWith).to.be.eql({ error: 'Conflict' });
    });
    it('Product inserted', () => {
      const r = { ...req };
      r.params = { id: 'id' };
      r.body = { name: 'name', description: 'description', price: 1.1 };
      insert(r, res);
      expect(res.jsonCalledWith).to.be.eql({ message: 'Product inserted' });
    });
  });

});