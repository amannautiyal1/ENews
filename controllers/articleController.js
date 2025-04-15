const client = require("../config/opensearch");

// Create the articles index
async function createIndex() {
  try {
    const response = await client.indices.create({
      index: "articles_index",
      body: {
        settings: {
          analysis: {
            tokenizer: {
              standard: { type: "standard" },
            },
          },
        },
        mappings: {
          properties: {
            title: { type: "text" },
            author: { type: "keyword" },
            content: { type: "text" },
            tags: { type: "keyword" },
            published_date: { type: "date" },
            created_at: { type: "date" },
          },
        },
      },
    });
    console.log("Index created:", response);
  } catch (error) {
    console.error("Error creating index:", error);
    throw error;
  }
}

// Insert article into OpenSearch
async function insertArticle(article) {
  try {
    const response = await client.index({
      index: "articles_index",
      body: article,
    });
    console.log("Article inserted:", response.body);
  } catch (error) {
    console.error("Error inserting article:", error);
    throw error;
  }
}

// Search articles by tag
async function searchArticlesByTag(tag) {
  try {
    const response = await client.search({
      index: "articles_index",
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
    console.error("Error searching by tag:", error);
    throw error;
  }
}
const ArticleService = require("../service/article");
async function create(req, res) {
  try {
    const { index, id, body } = req.body;
    const result = await ArticleService.create(index, id, body);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function get(req, res) {
  try {
    const { index, id } = req.params;
    const result = await ArticleService.get(index, id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function update(req, res) {
  try {
    const { index, id } = req.params;
    const result = await ArticleService.update(index, id, req.body);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function remove(req, res) {
  try {
    const { index, id } = req.params;
    const result = await ArticleService.remove(index, id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function search(req, res) {
    try {
      const { index } = req.params;
      const { filters = {}, match = {} } = req.body;
  
      const must = [];
  
      // Handle exact match or range queries
      for (const [key, value] of Object.entries(filters)) {
        if (typeof value === 'object' && (value.gte || value.lte)) {
          must.push({ range: { [key]: value } });
        } else {
          must.push({ term: { [key]: value } });
        }
      }
  
      // Handle match queries for text fields
      for (const [key, value] of Object.entries(match)) {
        must.push({ match: { [key]: value } });
      }
  
      const queryBody = {
        index,
        body: {
          query: {
            bool: {
              must
            }
          }
        }
      };
  
      const result = await ArticleService.search(queryBody); // <-- Pass full search body
      res.send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async function bulkInsert(req, res) {
    try {
      const { index } = req.params;
      const { documents } = req.body;

      if (!Array.isArray(documents)) {
        return res.status(400).json({ message: "documents must be an array" });
      }

      const result = await ArticleService.bulkInsert(index, documents);
      res.status(201).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async function searchByText(req, res) {
    try {
      const { index } = req.params;
      const { text } = req.body;
      if (!text) return res.status(400).json({ message: 'Search text is required.' });

      const results = await ArticleService.searchByText(index, text);
      res.json(results);
    } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({ message: err.message });
    }
  }
  

module.exports = {
  createIndex,
  insertArticle,
  searchArticlesByTag,
  create,
  get,
  update,
  remove,
  search,
  bulkInsert,
  searchByText
};
