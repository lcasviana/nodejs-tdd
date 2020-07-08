let products = {
  items: [
    {
      id: 1,
      name: 'Product 1',
      description: 'Product1 description',
      price: 19.00
    }
  ]
}

module.exports = {
  get(req, res, next) {
    res.json({ title: 'Products page' });
  },
  getById(req, res, next) {
    if (!req.params.id) {
      res.json({ error: 'Should receive an id' })
    }

    res.json({ success: 'Id received!' })
  }
};
