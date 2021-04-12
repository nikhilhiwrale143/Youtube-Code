// Import Dependencies
import { connectToDatabase } from "../lib/database";

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const db = await connectToDatabase();
    const collection = await db.collection("users");
    // Select the users collection from the database
    const users = await collection.find({}).toArray();

    res.status(200).json({ users });
  } else if (req.method === "POST") {
    // Take the user in the post
    const newuser = req.body;
    // connect to the DB
    const db = await connectToDatabase();
    // Use our collection
    const collection = await db.collection("users");
    //insert the user into the database.
    const users = await collection.insertOne(newuser);
    // Respond with a JSON string of all users in the collection
    res.status(200).json({ users });
  } else {
    res.status(404).json({ status: "Error route note found" });
  }
};
