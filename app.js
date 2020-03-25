const [command, key] = process.argv.slice(2);
const { askForPassword } = require("./lib/questions");
const { get, set, unset, reset } = require("./lib/commands");

const { askForMasterPassword } = require("./lib/questions");
const { readMasterPassword } = require("./lib/passwords");
const { verifyHash } = require("./lib/crypto");

async function run() {
  const answeredMasterPassword = await askForMasterPassword();

  if (command === "reset") {
    return reset(answeredMasterPassword);
  }
  const masterPassword = readMasterPassword();

  if (!verifyHash(answeredMasterPassword, masterPassword)) {
    console.error("Fuck off!");
    return;
  }

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
