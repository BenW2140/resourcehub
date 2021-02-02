import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {


  const params = {
    TableName: process.env.tableName,
    ExpressionAttributeValues: {
      ":high": 5
    },
    FilterExpression: 'postRating = :high',
    ProjectionExpression: "userId, postId",
  };


  const result = await dynamoDb.scan(params);
  const returnedPostsCount = result.Count;
  console.log(returnedPostsCount);
    console.log(result);
  if (!result) {
    throw new Error("Items not located!");
  }

  return result.Item;
  });