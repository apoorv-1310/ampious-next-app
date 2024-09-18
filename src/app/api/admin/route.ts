import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request: Request, response: NextResponse) => {
  if (request.method === "GET") {
    // @ts-ignore
    const client = new MongoClient("mongodb://localhost:27017/ampious");
    try {
      await client.connect();
      const database = client.db("ampious");
      const allData = await database
        .collection("gym_owners")
        .find({})
        .toArray();

      return NextResponse.json(allData, { status: 200 });
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

export const POST = async (request: Request, response: NextResponse) => {
  if (request.method === "POST") {
    // @ts-ignore
    const client = new MongoClient("mongodb://localhost:27017/ampious");
    try {
      await client.connect();
      const database = client.db("ampious");
      const body = await request.json();
      console.log("request.body!", body);

      await database.collection("gym_owners").insertOne({
        ...body,
        createdOn: new Date(),
        updatedOn: new Date(),
      });

      return NextResponse.json("Saved", { status: 201 });
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

export const DELETE = async (request: Request, response: NextResponse) => {
  if (request.method === "DELETE") {
    // @ts-ignore
    const client = new MongoClient("mongodb://localhost:27017/ampious");
    try {
      await client.connect();
      const database = client.db("ampious");
      const body = await request.json();
      console.log("request.body!", body);
      await database
        .collection("gym_owners")
        .deleteOne({ _id: new ObjectId(body._id) });
      return NextResponse.json("Deleted", { status: 200 });
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
