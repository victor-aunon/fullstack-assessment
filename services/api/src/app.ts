import * as express from "express";
import * as mongoose from "mongoose";
import currencyRouter from "@app/routes/currency.router";

// [DB Connection]

/**
 * connectToDatabase
 * Configures the global MongoDB connection based on the provided secrets.
 *
 * @returns Promise<string>
 */
async function connectToDatabase(connectionUri: string) {
  return new Promise((resolve, reject) => {
    // From mongoose@6.x.x onwards useNewUrlParser, useUnifiedTopology,
    // useCreateIndex are deprecated and default to true
    mongoose
      .connect(connectionUri)
      .then(() => resolve(connectionUri))
      .catch((error: any) => {
        console.log(error);
        reject(`${connectionUri}: ${error}`);
      });
  });
}

// [DB Close connection]

/**
 * disconnectFromDatabase
 * Closes the MongoDB connection.
 *
 * @returns Promise<string>
 */
async function disconnectFromDatabase() {
  return new Promise((resolve, reject) => {
    mongoose
      .disconnect()
      .then(() =>
        resolve(console.log("Closed connection to testing database"))
      )
      .catch((error: any) => {
        console.log(error);
        reject(error);
      });
  });
}

// [DB Remove database]

/**
 * removeDatabase
 * Removes the database (for testing purposes)
 *
 */
async function removeDatabase(connectionUri: string) {
  const mongoObj = await mongoose.connect(connectionUri)
  await mongoObj.connection.dropDatabase();
}

// [Express setup]

const app = express(),
  DIST_DIR = __dirname;
app.use(express.static(DIST_DIR));
app.use(express.json());
app.use(currencyRouter);
app.get("/health", async (req, res) => {
  res.status(200).json({ healthy: true });
});

export { app, connectToDatabase, disconnectFromDatabase, removeDatabase };
