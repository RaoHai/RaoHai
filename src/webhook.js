const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB_SECRET_FOR_NETLIFY,
});

exports.handler = async function(event, context, callback) {

  const result = await octokit.actions.createWorkflowDispatch({
    owner: 'RaoHai',
    repo: 'RaoHai',
    workflow_id: 'yuque.yml',
    ref: 'master',
  });

  console.log('--> handler received', context, result);

  callback(null, {
    statusCode: 200,
    body: 'Hello World',
  });
}
