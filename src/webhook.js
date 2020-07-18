const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB_SECRET_FOR_NETLIFY,
});

exports.handler = async function(event, context, callback) {
  const users = await octokit.request('/users');
  console.log('>> users', users);
  callback(null, {
    statusCode: 200,
    body: 'Hello World',
  });
}
