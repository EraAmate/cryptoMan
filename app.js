const [command, key] = process.argv.slice(2);
const { askForPassword } = require("./lib/questions");
const { get, set, unset, reset } = require("./lib/commands");

const { askForMasterPassword } = require("./lib/questions");
const { getMasterPassword } = require("./lib/queries");
const { connect, close } = require("./lib/db");
const { verifyHash } = require("./lib/crypto");

async function run() {
  try {
    await connect();
    const answeredMasterPassword = await askForMasterPassword();
    if (command === "reset") {
      return reset(answeredMasterPassword);
    }

    const masterPassword = await getMasterPassword();

    if (!verifyHash(answeredMasterPassword, masterPassword)) {
      console.error("Fuck off!");
      return;
    }

    if (command === "get") {
      await get(key, masterPassword);
    } else if (command === "set") {
      const password = await askForPassword(key);
      await set(key, password, masterPassword);
    } else if (command === "unset") {
      await unset(key);
    } else {
      console.error("Unknown command");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await close();
  }
}

run();
