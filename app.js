const [command, key] = process.argv.slice(2);
const { askForPassword } = require("./lib/questions");
const { get, set, unset } = require("./lib/commands");

async function run() {
  if (command === "get") {
    get(key);
  } else if (command === "set") {
    const password = await askForPassword(key);
    set(key, password);
  } else if (command === "unset") {
    unset(key);
  } else {
    console.error("Unknown command");
  }
}

run();
