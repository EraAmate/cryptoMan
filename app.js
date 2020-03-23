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
}
if (command === "get") {
  get();
} else if (command === "set") {
  set();
} else {
  console.error("Unknown command");
}
