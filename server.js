const app = require('./app');

// const port = process.env.PORT || 8001;
// app.listen(8001, () => console.log(`Server running on port ${port}`));

init();

async function init() {
  try {
    const port = process.env.PORT || 8001;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

module.exports = init;
