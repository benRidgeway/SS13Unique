const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//Get all categories and associated products
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product
      }
    ]
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get Category by ID and associated products
router.get('/:id', (req, res) => {
  
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this ID' });
      return;
  }
  res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

//create a category
router.post('/', (req, res) => {
  Category.create({
   category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//update category name by ID
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
   )
   .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this ID' });
      return;
  }
  res.json(categoryData);
  })
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   });
});

//delete category by ID
router.delete('/:id', (req, res) => {
  Category.destroy({
      where: {
        id: req.params.id
      }
    })
   .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this ID' });
      return;
  }
  res.json(categoryData);
  })
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   });
});

module.exports = router;
