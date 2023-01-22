import { app, connectToDatabase } from "./app";

declare var MONGODB_URI: string;

connectToDatabase(MONGODB_URI);

// [Express start]

const PORT: number | string = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
