const { MongoClient } = require("mongodb");

async function main() {
  const url = "mongodb://127.0.0.1:27017/";
  const client = new MongoClient(
    (url, { useNewUrlParser: true, useUnifiedTopology: true })
  );
  try {
    await client.connect();
    await listDatabases(client);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
main().catch(console.error);

async function listDatabases(client) {
  let databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
