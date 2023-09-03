const mongoose = require('mongoose');

const dotenv = require('dotenv');

//Uncaught exception
process.on('uncaughtException', (err) => {
  console.log('uncaught Exception', err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

//console.log(process.env);
// 3 start server
const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// Error outside express unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
