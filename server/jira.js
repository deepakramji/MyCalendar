const axios = require("axios");

// Replace with your Jira Cloud domain and API token or password
const jiraDomain = "https://hermanmiller.atlassian.net";
const userName = "deepak_ramji@hermanmiller.com";
const apiKeyOrPassword =
  "ATATT3xFfGF0iO_PALmE0auSQAHyUQowTPw55lGFADcPzgEdUwvfTKis59hqJRE3ASzCbTguBUyWEDoUQ_PA8c1lzkNxV5m6MLA5QP7Q7sM_yXYZZbfn0lbfRwwW4fKsSG3vlf-IPt0Us7pGaII-nDm7pqYQuz1ajDtFBBcs-3l7YyhdL1YOsjo=765E15F8";

// Define Jira API endpoints
const baseUrl = `https://${jiraDomain}/rest/api/latest`;
const issuesEndpoint = "/issue";
const restApiVersion = "/rest/servicedeskapi/";
const hmBase =
  "https://configura.atlassian.net//jira//secure//attachments//521174//image001.png";

const httpClient = axios.create({
  auth: {
    userName,
    apiKeyOrPassword,
  },
});
// Function to fetch issues from Jira
async function fetchIssues() {
  fetch("https://configura.atlassian.net/rest/api/3/issue/KS-855", {
    method: "GET",
    headers: {
      Authorization: `Basic ${Buffer.from(
        "deepak_ramji@hermanmiller.com:ATATT3xFfGF0iO_PALmE0auSQAHyUQowTPw55lGFADcPzgEdUwvfTKis59hqJRE3ASzCbTguBUyWEDoUQ_PA8c1lzkNxV5m6MLA5QP7Q7sM_yXYZZbfn0lbfRwwW4fKsSG3vlf-IPt0Us7pGaII-nDm7pqYQuz1ajDtFBBcs-3l7YyhdL1YOsjo=765E15F8"
      ).toString("base64")}`,
      Accept: "application/json",
    },
  })
    .then((response) => {
      console.log(`Response: ${response.status} ${response.statusText}`);
      return response.text();
    })
    .then((text) => console.log(text))
    .catch((err) => console.error(err));
}

fetchIssues();
