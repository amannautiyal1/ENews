const { searchArticlesByTag } = require('../../controllers/articleController');

const seed = require('../../migration/seed');  // Adjust the path as per your file structure

// Run the seed function when the application starts
async function startApp() {
  console.log("Starting application...");

  // Run the seed function
  await seed();

  // You can place other logic here for your app initialization
  console.log("Application initialized!");
}

// Start the application
startApp();

// // Search for articles by a tag
// searchArticlesByTag('AI').then(articles => {
//   console.log('Search results by tag "AI":', articles);
// }).catch(err=>console.log('error is : ',err));
