const app = require('./app');

init();

async function init() {
  try {
    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
