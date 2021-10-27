const mongoClient = require("mongodb").MongoClient;

const header = req.headers['x-ms-client-principal'];
const encoded = Buffer.from(header, 'base64');
const decoded = encoded.toString('ascii');
const user = JSON.parse(decoded);

module.exports = async function (context, req) {
	context.log('JavaScript HTTP trigger function processed a request with some tests.');

	const client = await mongoClient.connect(process.env.CONNECTION_STRING);
	const database = client.db(process.env.DATABASE_NAME);

	const response = await database.collection("tasks").find({
		userId: user.userId
	});
	
	const tasks = await response.toArray();

	// const tasks = [
	// 	{
	// 		id: 1,
	// 		label: "🍔 Eat",
	// 		status: ""
	// 	},
	// 	{
	// 		id: 2,
	// 		label: "🛏 Sleep",
	// 		status: ""
	// 	},
	// 	{
	// 		id: 3,
	// 		label: "</> Code",
	// 		status: ""
	// 	}
	// ];

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: tasks
    };
}