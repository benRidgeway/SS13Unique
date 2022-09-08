const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//get all tags
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'product_tags'        
      }
    ]
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get tag by id
router.get('/:id', (req, res) => {
 
  Tag.findOne(
    {
      where: {
        id: req.params.id
      }
    },
    {
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'product_tags'        
      }
    ]
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this ID' });
      return;
  }
  res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

//create new tag
router.post('/', (req, res) => {
  
  Tag.create({
    tag_name: req.body.tag_name
   })
   .then(tagData => res.json(tagData))
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   });

});

router.put('/:id', (req, res) => {

  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
   )
   .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this ID' });
      return;
  }
  res.json(tagData);
  })
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   });

});

router.delete('/:id', (req, res) => {

  Tag.destroy({
      where: {
        id: req.params.id
      }
    })
   .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this ID' });
      return;
  }
  res.json(tagData);
  })
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   });

});

module.exports = router;
