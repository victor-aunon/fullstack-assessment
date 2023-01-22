import { connectToDatabase } from "./app";
import { retrieveData } from "./retrieveData";

declare var MONGODB_URI: string;

connectToDatabase(MONGODB_URI);

// [Script execution]
console.log("Executing service...");

retrieveData().then(result => {
  console.log(result);
  process.exit(0);
});
