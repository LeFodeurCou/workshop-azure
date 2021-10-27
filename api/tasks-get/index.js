const mongoClient = require("mongodb").MongoClient;

module.exports = async function (context, req) {
	context.log('JavaScript HTTP trigger function processed a request with some tests.');

	const header = req.headers['x-ms-client-principal'];
	const encoded = Buffer.from(header, 'base64');
	const decoded = encoded.toString('ascii');
	const user = JSON.parse(decoded);

	const client = await mongoClient.connect(process.env.CONNECTION_STRING);
	const database = client.db(process.env.DATABASE_NAME);

	const response = await database.collection("tasks").find({
		userId: user.userId
	});
	
	const tasks = await response.toArray();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: tasks
    };
}