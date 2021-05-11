const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  // respond with json
  .then(dbCategoryData => res.json(dbCategoryData))
  // error catching
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategoryData => {
    // reject in case not found
    if(!dbCategoryData) {
        res.status(404).json({message: "No category found with this id"});
        return;
    }
    // respond with json if successful
    res.json(dbCategoryData);
  })
  // error catching
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category

  // only needs the category name
  Category.create({
    category_name: req.body.category_name
  })
  // send if successful
  .then(dbCategoryData => res.json( dbCategoryData))
  // catch if error
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    // requires category_name
    {
      category_name: req.body.category_name
    },
    // change by ID
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbCategoryData => {
    // 404 if not found
    if (!dbCategoryData) {
      res.status(404).json({message: 'No Category found with this ID'});
      return;
    }
    // return if found
    res.json(dbCategoryData);
  })
    // catch formatting errors
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    // find by parameter id number
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    // reject if not found
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id'})
    }
    // respond if found
    res.json(dbCategoryData);
  })
  // catch formatiing errors
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
