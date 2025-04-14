const client = require('../../config/opensearch');
const { format, formatHits } = require('../../utils/responseFormatter');

class ArticleService {
  async create(index, id, body) {
    const response = await client.index({ index, id, body, refresh: true });
    return format(response);
  }

  async get(index, id) {
    try {
      const response = await client.get({ index, id });
      return format(response);
    } catch (err) {
      if (err.meta.statusCode === 404) {
        return `Article not found in "${index}" with ID "${id}"`;
      }
      throw err;
    }
  }

  async update(index, id, doc) {
    const response = await client.update({
      index,
      id,
      body: { doc },
      refresh: true
    });
    return format(response);
  }

  async remove(index, id) {
    const response = await client.delete({ index, id, refresh: true });
    return format(response);
  }

   async search({ index, body }) {
    const response = await client.search({
      index,
      body
    });
  
    return {
      took: response.body.took,
      hits: response.body.hits.hits.map(hit => ({
        id: hit._id,
        ...hit._source
      }))
    };
  }
  
}

module.exports = new ArticleService();
