import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;

    //--------------------------------<< connect to dataBase >>--------------------------------
    const client = await MongoClient.connect(
      "mongodb+srv://Sheynodeveloper7555:IuKzJypz9H8jmOKB@cluster0.ngfma5f.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    //--------------------------------<< accessing to dataBase >>--------------------------------

    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    //--------------------------------<< entires to tables of data base >>--------------------------------
    const result = await meetupsCollection.insertOne(data);

    //--------------------------------<< closing connection >>--------------------------------
    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
