const express = require('express');
const TaxonomyNode = require('../models/TaxonomyNode');

const router = express.Router();

// GET /api/nodes
router.get('/', async (req, res) => {
  try {
    const nodes = await TaxonomyNode.find({});
    res.json(nodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/nodes/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  try {
    const updatedNode = await TaxonomyNode.findByIdAndUpdate(
      id,
      { answer },
      { new: true }
    );

    if (!updatedNode)
      return res.sendStatus(404);

    res.json(updatedNode);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE /api/nodes/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedNode = await TaxonomyNode.findByIdAndUpdate(
      id,
      { answer: '' },
      { new: true }
    );

    if (!updatedNode)
      return res.sendStatus(404);

    res.json(updatedNode);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
