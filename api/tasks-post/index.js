const mongoClient = require("mongodb").MongoClient;

module.exports = async function (context, req) {
	const header = req.headers['x-ms-client-principal'];
	const encoded = Buffer.from(header, 'base64');
	const decoded = encoded.toString('ascii');
	const user = JSON.parse(decoded);

	var POST = {};
    if (req.method == 'POST') {
        req.on('data', function(data) {
            data = data.toString();
            data = data.split('&');
            for (var i = 0; i < data.length; i++) {
                var _data = data[i].split("=");
                POST[_data[0]] = _data[1];
            }
            console.log(POST);
        })

	// const client = await mongoClient.connect(process.env.CONNECTION_STRING);
	// const database = client.db(process.env.DATABASE_NAME);

	// const response = await database.collection("tasks").insertOne(
	// 	{
	// 		"userId": "c807f49263e340b2b4d4e40241d0bae8",
	// 		"label": "test",
	// 		"status": ""
	// 	  }
	// );
	
	// const tasks = await response.toArray();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "response"
    };
}