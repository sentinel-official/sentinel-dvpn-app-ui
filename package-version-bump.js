const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const writeVersionToRobots = (version) => {
  return new Promise((resolve, reject) => {
    try {
      const robotsPath = path.join(__dirname, "ui", "robots.txt");
      let robotsContent = fs.readFileSync(robotsPath, "utf8");

      robotsContent = robotsContent.replace(/Version: .*\n?/, "");

      robotsContent += `\nVersion: ${version}\n`;

      fs.writeFileSync(robotsPath, robotsContent);
      resolve(true);
    } catch (e) {
      console.log(e);
      reject(false);
    }
  });
};

function bumpVersion(type) {
  return new Promise(async (resolve, reject) => {
    if (type && ["patch", "minor", "major"].includes(type)) {
      try {
        await new Promise((res, rej) => {
          exec(`yarn version --${type}`, { stdio: "inherit" }, (error) => {
            if (error) rej(error);
            else res();
          });
        });
        const packageJson = require("./package.json");
        const version = packageJson.version;

        const written = await writeVersionToRobots(version);
        if (written) {
          await new Promise((res, rej) => {
            exec(`git add .`, { stdio: "inherit" }, (error) => {
              if (error) rej(error);
              else res();
            });
          });
          await new Promise((res, rej) => {
            exec(`git commit -m "v${version}"`, { stdio: "inherit" }, (error) => {
              if (error) rej(error);
              else res();
            });
          });
          resolve();
        } else {
          reject(new Error("Failed to write version to robots.txt"));
        }
      } catch (e) {
        reject(e);
      }
    } else {
      reject(new Error("Invalid version type provided!"));
    }
  });
}

async function run() {
  try {
    const readline1 = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline1.question("Select a version type: patch | minor | major: ", async (type) => {
      try {
        await bumpVersion(type);
        console.log("Version bumped successfully!");
      } catch (e) {
        console.error(e.message);
      } finally {
        readline1.close();
      }
    });
  } catch (e) {
    console.log("Building the app has failed");
  }
}

run();
