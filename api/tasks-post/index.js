const mongoClient = require("mongodb").MongoClient;

module.exports = async function (context, req) {
	const header = req.headers['x-ms-client-principal'];
	const encoded = Buffer.from(header, 'base64');
	const decoded = encoded.toString('ascii');
	const user = JSON.parse(decoded);

	if (req.body.label)
	{
		const client = await mongoClient.connect(process.env.CONNECTION_STRING);
		const database = client.db(process.env.DATABASE_NAME);

		const response = await database.collection("tasks").insertOne(
			{
				"userId": user.userId,
				"label": req.body.label,
				"status": ""
			}
		);
		context.res = {
			// status: 200, /* Defaults to 200 */
			body: req.body
		};
	}
	
	// const tasks = await response.toArray();

    context.res = {
        status: 500,
        body: "Label isn't provided"
    };
}