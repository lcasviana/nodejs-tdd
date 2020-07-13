let products = [
  {
    id: '5f06669b47405a1a7854439b',
    name: 'Exoswitch',
    description: 'Elit enim esse ea id ut deserunt Lorem ea excepteur occaecat fugiat nisi. Exercitation ad labore aliqua minim anim ut qui ut aliquip Lorem do magna laborum. Amet sit deserunt enim esse anim consequat.',
    price: 2084.5463
  },
  {
    id: '5f06669b1767d6e5984ca4a4',
    name: 'Mobildata',
    description: 'Deserunt adipisicing dolor dolore aliqua Lorem nisi quis quis. Eu veniam sit incididunt incididunt est eiusmod ad amet et cillum sunt eu. Non in enim duis incididunt proident ullamco proident sunt amet.',
    price: 2494.6831
  },
  {
    id: '5f06669b7b72b037b1df5891',
    name: 'Cowtown',
    description: 'Laborum consequat consectetur labore cupidatat sunt duis velit eu est aliqua est deserunt amet ex. Minim exercitation culpa id non cupidatat proident aute enim ipsum voluptate cillum officia. Enim qui reprehenderit eu eiusmod do. Nisi nostrud anim eiusmod voluptate.',
    price: 1164.3721
  },
  {
    id: '5f06669bd930a833ffc668b0',
    name: 'Anocha',
    description: 'Nostrud sit sint sint magna occaecat sint. Dolor tempor ex tempor nisi tempor. Excepteur adipisicing proident consequat non ex officia pariatur non in aute esse deserunt esse qui.',
    price: 3371.6129
  },
  {
    id: '5f06669bb0135b8a915c5dc9',
    name: 'Viocular',
    description: 'Consectetur qui magna amet est quis nisi anim officia Lorem eiusmod cupidatat dolore. Eiusmod nulla aute adipisicing laboris. Qui sit magna dolor veniam aliqua enim laborum officia cupidatat amet. Proident duis sint proident ad ad ut exercitation est est aute labore in adipisicing magna. Aute cupidatat velit excepteur veniam consectetur mollit duis velit ex. Ea mollit aliquip proident aliquip sunt duis. Sit ipsum pariatur sint voluptate esse pariatur nisi mollit ex voluptate nisi sunt Lorem in.',
    price: 2742.8292
  }
];

module.exports = {

  getAll(req, res, next) {
    try {
      if (!products.length) res.json({ error: 'No content' });

      res.json({ products });

    } catch (err) {
      console.error(err);
      res.json({ error: 'Internal error' });
    }
  },

  getById(req, res, next) {
    try {
      if (!req.params.id) res.json({ error: 'Id invalid' });

      const product = products.find(product => product.id == req.params.id);
      if (!product) res.json({ error: 'Not found' });

      res.json({ product });

    } catch (err) {
      console.error(err);
      res.json({ error: 'Internal error' });
    }
  },

  insert(req, res, next) {
    try {
      if (!req.params.id) res.json({ error: 'Id invalid' });

      if (!req.body.name) res.json({ error: 'Name falsy' });
      if (typeof req.body.name !== 'string') res.json({ error: 'Name not string' });
      if (!req.body.name.trim()) res.json({ error: 'Name only whitespaces' });
      if (req.body.name.trim().length < 1) res.json({ error: 'Name length less than 1' });

      if (!req.body.description) res.json({ error: 'Description falsy' });
      if (typeof req.body.description !== 'string') res.json({ error: 'Description not string' });
      if (!req.body.description.trim()) res.json({ error: 'Description only whitespaces' });
      if (req.body.description.trim().length < 10) res.json({ error: 'Description length less than 10' });

      if (!req.body.price) res.json({ error: 'Price falsy' });
      if (typeof req.body.price !== 'number') res.json({ error: 'Price not number' });
      if (req.body.price <= 0) res.json({ error: 'Price less equal 0' });

      let product = products.find(product => product.id == req.params.id);
      if (product) res.json({ error: 'Conflict' });

      product = {
        id: req.params.id.trim(),
        name: req.body.name.trim(),
        description: req.body.description.trim(),
        price: req.body.price
      };
      console.log(product);

      products = [...products, product];
      res.json({ message: 'Product inserted' });

    } catch (err) {
      console.error(err);
      res.json({ error: 'Internal error' });
    }
  }

};
