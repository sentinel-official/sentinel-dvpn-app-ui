const fs = require("fs");
const execSync = require("child_process").execSync;

if (!fs.existsSync("./node_modules")) {
  execSync("yarn install");
  return;
}
return;
