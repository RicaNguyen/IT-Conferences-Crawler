import { MongoClient } from "mongodb";

export const uri =
  "mongodb+srv://admin-crawler:L5PHMqATznj8SXl9@it-conferences-crawler.ilt77ty.mongodb.net/?retryWrites=true&w=majority&appName=IT-Conferences-Crawler";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  // serverApi: {
  //   version: ServerApiVersion.v1,
  //   strict: true,
  //   deprecationErrors: true,
  // },
});
export const dbName = "Event";
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
