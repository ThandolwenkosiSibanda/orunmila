// ADD YOUR OWN KEYS AND RENAME THIS FILE TO keys.js
const TWITTER_TOKENS = {
  TWITTER_CONSUMER_KEY: "4v9DFXTPRPR0v5Ql6tvZ88qgY",
  TWITTER_CONSUMER_SECRET: "SKGTx4h8zMkRHUQcLHJpOufbdVRIyX6sgWgpdoNQXhKDFsD15D",
  TWITTER_ACCESS_TOKEN: "1097365759-gcBJB3pCWWPqWrmi1SgGniyUB8hFhhCWL1UkGkx",
  TWITTER_TOKEN_SECRET: "v3cUhzRyBSkJ6l7UfXsBHy1fGXo84fj4KlFfshIeEZKPh"
};

const GOOGLE_TOKENS = {
  GOOGLE_CLIENT_ID:"171891338489-8b83scjhf5bc7ouhcm1su5vm4eko4e60.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET:"JTFlYwQYVTO0LBd2v-vnDHjg"
}


const MONGODB = {
  MONGODB_URI: `mongodb+srv://admin:thand0l2@cluster0.vufj9.mongodb.net/truckerzim?retryWrites=true&w=majority`
};

const SESSION = {
  COOKIE_KEY: "d80212b3dd4de610b76215cb9898d3b618b87cffad99bffd80b88e73b19a79f46a10534d3902256b8b8ce023495e5c87c69bb43dddc55bdec4bdffdb25885aa7"
};

const KEYS = {
  ...TWITTER_TOKENS,
  ...GOOGLE_TOKENS,
  ...MONGODB,
  ...SESSION
};

module.exports = KEYS;
