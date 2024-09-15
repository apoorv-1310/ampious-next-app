import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request: Request, response: NextResponse) => {
	if (request.method === "GET") {
		// @ts-ignore
		const client = new MongoClient("mongodb://localhost:27017/ampious");
		try {
			await client.connect();
			const database = client.db("ampious");
			const allData = await database.collection("gym_owners").find({}).toArray();

			return NextResponse.json(allData,
				{ status: 200 }
			);
		} catch (error) {
			return NextResponse.json(
				{
					error: error,
				},
				{ status: 400 }
			);
		} finally {
			await client.close();
		}
	} else {
		NextResponse.json({ message: "Method not allowed!" }, {});
	}
	return NextResponse.json(
		{
			name: "apoorv",
		},
		{ status: 200 }
	);
};
