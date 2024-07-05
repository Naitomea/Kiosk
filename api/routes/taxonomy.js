const express = require('express');
const TaxonomyNode = require('../models/TaxonomyNode');

const router = express.Router();

//#region Taxonomy Creation

function createTaxonomy(nodes) {
  const organizedNode = {};

  for (const node of nodes) {
    const { _id, topic, subTopic } = node;

    if (!organizedNode[topic])
      organizedNode[topic] = {};

    if (!organizedNode[topic][subTopic])
      organizedNode[topic][subTopic] = [];

    organizedNode[topic][subTopic].push(_id);
  };

  return organizedNode;
};

function createFullTaxonomy(nodes) {
  const rootNodes = [];
  const stack = [];
  
  for (const node of nodes) {
    const fnode = {
      ...node._doc,
      nodes: [],
    };
    
    // Look for parent...
    while (stack.length > 0 && stack[stack.length - 1].level >= fnode.level)
      stack.pop();

    if (stack.length > 0) // Has parent?
      stack[stack.length - 1].nodes.push(fnode);

    if (stack.length === 0) // RootNode?
      rootNodes.push(fnode);

    stack.push(fnode);
  }

  return rootNodes;
}

//#endregion

//#region Routes

// GET /api/taxonomy
router.get('/', async (req, res) => {
  try {
    const nodes = await TaxonomyNode.find({});
    const taxonomy = createTaxonomy(nodes);
    res.json(taxonomy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/taxonomy/full
router.get('/full', async (req, res) => {
  try {
    const nodes = await TaxonomyNode.find({});
    const taxonomy = createFullTaxonomy(nodes);
    res.json(taxonomy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//#endregion

module.exports = router;
