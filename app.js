const fs = require("fs");
const [command, key, value] = process.argv.slice(2);

// fs.readFile("db.json","utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

function get() {
  console.log("Called GET", key);
  // Read and log db.json

  try {
    const passwordsJSON = fs.readFileSync("db.json", "utf8");
    const passwords = JSON.parse(passwordsJSON);
    console.log(key, passwords[key]);
  } catch (error) {
    console.error(error);
  }
}

function set() {
  console.log("Called SET", key, value);

  // READ dbJSON + update by key
  const content = { content };

  try {
    let passwordsJSON = fs.readFileSync("db.json", "utf8");
    let passwords = JSON.parse(passwordsJSON);
    // UPDATE
    passwords[key] = value;
    //WRITE DB.JSON
    fs.writeFileSync("db.json", JSON.stringify(passwords, null, 2)); // db.json formatierung
  } catch (error) {
    console.error(error);
  }
}

function unset() {
  console.log("Called SET", key, value);
  try {
    let passwordsJSON = fs.readFileSync("db.json", "utf8");
    let passwords = JSON.parse(passwordsJSON);
    delete passwords[key];
    fs.writeFileSync("db.json", JSON.stringify(passwords, null, 2)); // db.json formatierung
  } catch (error) {
    console.error(error);
  }
}

if (command === "get") {
  get();
} else if (command === "set") {
  set();
} else if (command === "unset") {
  unset();
} else {
  console.error("Unknown command");
}
