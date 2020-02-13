const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post("/", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });

  res.status(201).send();
});

// Delete Post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://napster:Lutfiya1202@ds151586.mlab.com:51586/vue_express",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  return client.db("vue_express").collection("posts");
}

module.exports = router;
