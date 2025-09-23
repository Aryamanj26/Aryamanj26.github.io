// fetch.js — safe for GitHub Actions + graceful fallbacks

const fs = require("fs");
const https = require("https");
const process = require("process");
require("dotenv").config();

// ---- ENV ----
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "";
const USE_GITHUB_DATA = (process.env.USE_GITHUB_DATA || "false").toLowerCase();
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME || "";

// Prefer server-side tokens (NOT REACT_APP_*) so they never ship to the client
const GH_TOKEN =
  process.env.GITHUB_TOKEN || // provided by GitHub Actions
  process.env.PUBLIC_GH_TOKEN || // optional PAT secret
  "";

// ---- Helpers ----
function writeJSON(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
  console.log(`saved file to ${file}`);
}

function fetchGitHubProfile(username, token) {
  return new Promise(resolve => {
    // Default empty profile shape the UI can handle
    const fallback = {
      data: {
        user: {
          name: username || "",
          bio: "",
          avatarUrl: "",
          location: "",
          pinnedItems: {totalCount: 0, edges: []}
        }
      }
    };

    if (USE_GITHUB_DATA !== "true" || !username) {
      console.log(
        "Skipping GitHub fetch (USE_GITHUB_DATA=false or no username)."
      );
      writeJSON("./public/profile.json", fallback);
      return resolve();
    }

    if (!token) {
      console.warn("No GitHub token provided; writing fallback profile.json.");
      writeJSON("./public/profile.json", fallback);
      return resolve();
    }

    console.log(`Fetching GitHub profile for ${username}`);

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

    const req = https.request(options, res => {
      let data = "";
      console.log(`GitHub statusCode: ${res.statusCode}`);

      res.on("data", d => (data += d));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          console.warn("GitHub fetch non-200; writing fallback profile.json.");
          writeJSON("./public/profile.json", fallback);
          return resolve();
        }
        fs.writeFile("./public/profile.json", data, err => {
          if (err) {
            console.warn(
              "Failed to write profile.json; writing fallback.",
              err
            );
            writeJSON("./public/profile.json", fallback);
          } else {
            console.log("saved file to public/profile.json");
          }
          resolve();
        });
      });
    });

    req.on("error", e => {
      console.warn(
        "GitHub fetch error; writing fallback profile.json.",
        e.message
      );
      writeJSON("./public/profile.json", fallback);
      resolve();
    });

    req.write(body);
    req.end();
  });
}

function fetchMediumBlogs(username) {
  return new Promise(resolve => {
    const fallback = {items: []};

    if (!username) {
      console.log("No MEDIUM_USERNAME; writing empty blogs.json.");
      writeJSON("./public/blogs.json", fallback);
      return resolve();
    }

    console.log(`Fetching Medium blogs for ${username}`);
    const options = {
      hostname: "api.rss2json.com",
      path: `/v1/api.json?rss_url=https://medium.com/feed/@${username}`,
      port: 443,
      method: "GET"
    };

    const req = https.request(options, res => {
      let data = "";
      console.log(`Medium statusCode: ${res.statusCode}`);

      res.on("data", d => (data += d));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          console.warn("Medium fetch non-200; writing empty blogs.json.");
          writeJSON("./public/blogs.json", fallback);
          return resolve();
        }
        fs.writeFile("./public/blogs.json", data, err => {
          if (err) {
            console.warn(
              "Failed to write blogs.json; writing empty list.",
              err
            );
            writeJSON("./public/blogs.json", fallback);
          } else {
            console.log("saved file to public/blogs.json");
          }
          resolve();
        });
      });
    });

    req.on("error", e => {
      console.warn("Medium fetch error; writing empty blogs.json.", e.message);
      writeJSON("./public/blogs.json", fallback);
      resolve();
    });

    req.end();
  });
}

// ---- Run both, never fail the build ----
(async () => {
  await Promise.all([
    fetchGitHubProfile(GITHUB_USERNAME, GH_TOKEN),
    fetchMediumBlogs(MEDIUM_USERNAME)
  ]);
  console.log("fetch.js finished with fallbacks as needed.");
  process.exit(0);
})();
