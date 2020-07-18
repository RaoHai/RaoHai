const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB_SECRET_FOR_NETLIFY,
});

exports.handler = async function(event, context, callback) {
    console.log('>> webhook received', process.env.GITHUB_SECRET_FOR_NETLIFY);

    callback(null, {
      statusCode: 200,
      body: await octokit.request('/users'),
    });
}
