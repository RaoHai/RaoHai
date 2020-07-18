exports.handler = function(event, context, callback) {
    console.log('>> webhook received', event);
    callback(null, { statusCode: 200, body: "Hello, World" });
}
