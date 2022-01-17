const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

exports.getAllTodoItems = async (event) => {
  const params = {
    TableName = process.env.TABLE_NAME
  }

  const data = await docClient.scan(params).promise()
  console.log(data)
  const items = data.Items;

  const response = {
    statusCode: 200,
    body: JSON.stringify(items)
  };

  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
