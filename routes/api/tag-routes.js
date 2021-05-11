const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all 
  Tag.findAll({
  // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id',]
      }
    ]
  })
  // respond with the data
  .then(dbTagData => res.json(dbTagData))
  // catch if theres an error
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
  // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTagData => {
    // reject in case not found
    if(!dbTagData) {
        res.status(404).json({message: "No tag found with this id"});
        return;
    }
    // respond with json if successful
    res.json(dbTagData);
  })
  // error catching
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  // only needs the tag name
  Tag.create({
    tag_name: req.body.tag_name
  })
  // send if successful
  .then(dbTagData => res.json(dbTagData))
  // catch if error
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  
  Tag.update(
    // requires tag_name
    {
      tag_name: req.body.tag_name
    },
    // target change by ID
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbTagData => {
    // 404 if not found
    if (!dbTagData) {
      res.status(404).json({message: 'No tag found with this ID'});
      return;
    }
    // return if found
    res.json(dbTagData);
  })
    // catch formatting errors
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    // find by parameter id number
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    // reject if not found
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id'})
    }
    // respond if found
    res.json(dbTagData);
  })
  // catch formatiing errors
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
