function format(response) {
    return JSON.stringify(response.body || response, null, 2);
  }
  
  function formatHits(hits) {
    return hits.map(hit => ({
      id: hit._id,
      score: hit._score,
      ...hit._source
    }));
  }
  
module.exports = { format, formatHits };
  