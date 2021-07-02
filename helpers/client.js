const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: "zdrr72ub",
  dataset: "production",
  apiVersion: "v1",
  token: process.env.SANITY_TOKEN,
  useCdn: false, // `false` if you want to ensure fresh data
});

export default client;
