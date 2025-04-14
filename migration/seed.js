const {
  createIndex,
  insertArticle,
} = require("../controllers/articleController");

const sampleArticles = [
  {
    title: "AI Advancements in Healthcare",
    author: "John Doe",
    content:
      "Artificial Intelligence is revolutionizing the healthcare industry by improving diagnostic accuracy and treatment outcomes.",
    tags: ["AI", "Healthcare", "Technology"],
    published_date: "2025-04-08",
    created_at: "2025-04-08T10:00:00",
  },
  {
    title: "Blockchain in Financial Services",
    author: "Jane Smith",
    content:
      "Blockchain technology is revolutionizing the financial services industry by offering transparency and reducing fraud.",
    tags: ["Blockchain", "Finance", "Technology"],
    published_date: "2025-04-05",
    created_at: "2025-04-05T09:30:00",
  },
];

// Function to seed the database
async function seed() {
  try {
    console.log('Creating Index');
    // First, create the index
    await createIndex();
    console.log("Index created successfully.");

    // Insert sample articles
    for (let article of sampleArticles) {
      await insertArticle(article);
    }
    console.log("Sample articles inserted successfully.");
  } catch (error) {
    console.error("Error seeding the data:", error);
  }
}

// Export the seed function to be used in index.js
module.exports = seed;
