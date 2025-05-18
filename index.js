const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Import the driver data

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jea08bc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // To ahow the data in UI and manage the data using get
    app.get("/coffees", async (req, res) => {
      const result = await coffesCollections.find().toArray();
      res.send(result);
    });

    //Inserting Data
    const coffesCollections = client.db("coffeDB").collection("coffees");
    app.post("/coffees", async (req, res) => {
      const newCoffe = req.body;
      console.log(newCoffe);
      const result = await coffesCollections.insertOne(newCoffe);
      res.send(result);
    });

    app.delete("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }; // to import id from mongodb
      const result = await coffesCollections.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// End the driver data

app.get("/", (req, res) => {
  res.send("coffe-store-dev");
});

app.listen(port, () => {
  console.log(`Example app listening port ${port}`);
});
