const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: process.env.GITHUB_SECRET_FOR_NETLIFY,
});

exports.handler = async function(event, context, callback) {

  if (event.httpMethod !== 'POST') {
    console.log('Invalid httpMethod:', event.httpMethod);

    callback(null, {
      statusCode: 200,
      body: 'Invalid httpMethod',
    });
  }

  console.log('>> event received', event);
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
