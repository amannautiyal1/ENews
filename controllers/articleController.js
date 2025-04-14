const client = require('../config/opensearch');

// Create the articles index
async function createIndex() {
  try {
    
    const response = await client.indices.create({
      index: 'articles_index',
      body: {
        settings: {
          analysis: {
            tokenizer: {
              standard: { type: 'standard' },
            },
          },
        },
        mappings: {
          properties: {
            title: { type: 'text' },
            author: { type: 'keyword' },
            content: { type: 'text' },
            tags: { type: 'keyword' },
            published_date: { type: 'date' },
            created_at: { type: 'date' },
          },
        },
      },
    });
    console.log('Index created:', response);
  } catch (error) {
    console.error('Error creating index:', error);
    throw error;
  }
}

// Insert article into OpenSearch
async function insertArticle(article) {
  try {
    const response = await client.index({
      index: 'articles_index',
      body: article,
    });
    console.log('Article inserted:', response.body);
  } catch (error) {
    console.error('Error inserting article:', error);
    throw error;
  }
}

// Search articles by tag
async function searchArticlesByTag(tag) {
  try {
    const response = await client.search({
      index: 'articles_index',
      body: {
        query: {
          term: {
            tags: tag,
          },
        },
      },
    });
    return response.body.hits.hits;
  } catch (error) {
    console.error('Error searching by tag:', error);
    throw error;
  }
}

module.exports = {
  createIndex,
  insertArticle,
  searchArticlesByTag,
};
