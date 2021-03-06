const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://fullstack:open@cluster0-edmhn.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log(e));

mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});
