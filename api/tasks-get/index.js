module.exports = async function (context, req) {
	context.log('JavaScript HTTP trigger function processed a request with some tests.');

	const tasks = [
		{
			id: 1,
			label: "🍔 Eat",
			status: ""
		},
		{
			id: 2,
			label: "🛏 Sleep",
			status: ""
		},
		{
			id: 3,
			label: "</> Code",
			status: ""
		}
	];

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: tasks
    };
}