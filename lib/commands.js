const { writeDB } = require("./passwords");

const { encrypt, decrypt, hashPassword } = require("./crypto");
const { getPassword, setPassword, unsetPassword } = require("./queries");

async function get(key, masterPassword) {
  const encryptedPassword = await getPassword(key);
  const password = decrypt(encryptedPassword, masterPassword);
  console.log(key, password);
}

async function set(key, value, masterPassword) {
  console.log("Called SET", key, value);
  const encryptedValue = encrypt(value, masterPassword);
  await setPassword(key, encryptedValue);
}

async function unset(key) {
  await unsetPassword(key);
}

function reset(masterPassword) {
  const db = {
    masterPassword: hashPassword(masterPassword),
    passwords: {},
  };

  writeDB(db);
  console.log("Reseted database with new master password");
}

module.exports = {
  get,
  set,
  unset,
  reset,
};
