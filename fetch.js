// fetch.js — hardened for Actions + optional Medium

const fs = require("fs");
const https = require("https");
const process = require("process");
require("dotenv").config();

const GH_TOKEN =
  process.env.GITHUB_TOKEN ||          // passed by GitHub Actions
  process.env.PUBLIC_GH_TOKEN ||       // optional repo secret (PAT)
  process.env.REACT_APP_GITHUB_TOKEN || // legacy fallback (avoid if possible)
  "";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "";
const USE_GITHUB_DATA = (process.env.USE_GITHUB_DATA || "false").toLowerCase();
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME || "";

const ERR = {
  noUserName: "Github Username is undefined. Set GITHUB_USERNAME.",
  requestFailed: "The request to GitHub didn't succeed. Check your token.",
  requestMediumFailed:
    "The request to Medium didn't succeed. Continuing without blogs."
};

// ---- helpers ----
function writeJSON(filePath, obj) {
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
  console.log(`saved file to ${filePath}`);
}

function fetchGitHubProfile(username, token) {
  return new Promise((resolve, reject) => {
    if (!username) return reject(new Error(ERR.noUserName));
    if (USE_GITHUB_DATA === "true" && !token)
      return reject(
        new Error("Missing GitHub token. Set GITHUB_TOKEN or PUBLIC_GH_TOKEN.")
      );

    console.log(`Fetching profile data for ${username}`);

    const body = JSON.stringify({
      query: `
{
  user(login:"${username}") {
    name
    bio
    avatarUrl
    location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
        node {
          ... on Repository {
            name
            description
            forkCount
            stargazers { totalCount }
            url
            id
            diskUsage
            primaryLanguage { name color }
          }
        }
      }
    }
  }
}
`
    });

    const options = {
      hostname: "api.github.com",
      path: "/graphql",
      port: 443,
      method: "POST",
      headers: {
        "User-Agent": "Node",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      console.log(`GitHub statusCode: ${res.statusCode}`);
      if (res.statusCode !== 200) {
        res.resume(); // drain
        return reject(new Error(ERR.requestFailed));
      }
      res.on("data", (d) => (data += d));
      res.on("end", () => {
        // Persist the raw GraphQL response; the UI reads from /public/profile.json
        fs.writeFile("./public/profile.json", data, (err) => {
          if (err) return reject(err);
          console.log("saved file to public/profile.json");
          resolve();
        });
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function fetchMediumBlogs(username) {
  return new Promise((resolve) => {
    if (!username) {
      console.log("No MEDIUM_USERNAME provided; writing empty blogs.json.");
      writeJSON("./public/blogs.json", { items: [] });
      return resolve();
    }

    console.log(`Fetching Medium blogs data for ${username}`);
    const options = {
      hostname: "api.rss2json.com",
      path: `/v1/api.json?rss_url=https://medium.com/feed/@${username}`,
      port: 443,
      method: "GET"
    };

    const req = https.request(options, (res) => {
      let mediumData = "";
      console.log(`Medium statusCode: ${res.statusCode}`);

      // If Medium/RSS service hiccups, degrade gracefully
      if (res.statusCode !== 200) {
        res.resume(); // drain
        console.warn(ERR.requestMediumFailed);
        writeJSON("./public/blogs.json", { items: [] });
        return resolve();
      }

      res.on("data", (d) => (mediumData += d));
      res.on("end", () => {
        fs.writeFile("./public/blogs.json", mediumData, (err) => {
          if (err) {
            console.warn("Failed to write blogs.json; writing empty list.", err);
            writeJSON("./public/blogs.json", { items: [] });
          } else {
            console.log("saved file to public/blogs.json");
          }
          resolve();
        });
      });
    });

    req.on("error", (error) => {
      console.warn("Medium fetch failed:", error.message, "Continuing without blogs.");
      writeJSON("./public/blogs.json", { items: [] });
      resolve();
    });

    req.end();
  });
}

// ---- orchestrate ----
(async () => {
  try {
    const jobs = [];

    if (USE_GITHUB_DATA === "true") {
      jobs.push(fetchGitHubProfile(GITHUB_USERNAME, GH_TOKEN));
    }

    jobs.push(fetchMediumBlogs(MEDIUM_USERNAME));

    await Promise.all(jobs);
    console.log("fetch.js completed successfully.");
  } catch (e) {
    console.error(e);
    process.exit(1); // fail build if GitHub step truly failed
  }
})();
