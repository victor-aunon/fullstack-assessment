import * as mongoose from "mongoose";

// [DB Connection]

/**
 * connectToDatabase
 * Configures the global MongoDB connection based on the provided secrets.
 *
 * @returns Promise<string>
 */
export async function connectToDatabase(connectionUri: string) {
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
export async function disconnectFromDatabase() {
  return new Promise((resolve, reject) => {
    mongoose
      .disconnect()
      .then(() => resolve(console.log("Closed connection to testing database")))
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
export async function removeDatabase(connectionUri: string) {
  const mongoObj = await mongoose.connect(connectionUri);
  await mongoObj.connection.dropDatabase();
}
