const { exec } = require("child_process");
const readline = require("readline");

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

read.question(
  "Select a version type: patch | minor | major: ",
  async (type) => {
    if (type && ["patch", "minor", "major"].includes(type)) {
      await exec(`yarn version --${type}`);
      await exec(`git add .`);
      await exec(`git commit -m "chore: package version bumped"`);
    } else {
      console.log("You have selected none of the above!");
    }
    read.close();
  }
);
