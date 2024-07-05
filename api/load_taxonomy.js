const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const TaxonomyNode = require('./models/TaxonomyNode');

mongoose.connect('mongodb://localhost/kiosk');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  loadTaxonomy();
});

const loadTaxonomy = async () => {
  const nodes = [];

  fs.createReadStream('data/taxonomy.csv')
    .pipe(csv({ separator: ',' }))
    .on('data', async (row) => {
      nodes.push({
        level: row.level,
        topic: row.topic,
        subTopic: row.subtopic,
        label: row.label,
      });
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');
      await TaxonomyNode.deleteMany({}); // Clear existing data

      for (const node of nodes)
        await new TaxonomyNode(node).save();

      console.log('Taxonomy successfully loaded');
      mongoose.connection.close();
    });
};
