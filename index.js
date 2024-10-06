require('dotenv').config()

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// MIDDLEWARE

app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://Remembering-our-heroes:07YoPwpeaNOP6XFk@cluster0.2vutuar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const martyrDB = client.db('Remembering-our-heroes').collection('martyr');
const footageDB = client.db('Remembering-our-heroes').collection('footage');
const PerpetratorDB = client.db('Remembering-our-heroes').collection('Perpetrator');
const blogDB = client.db('Remembering-our-heroes').collection('blog');
async function run() {
  try {



  } finally {

  }
}
run().catch(console.dir);


app.get("/allmartyr", async (req, res) => {
  const find = martyrDB.find()
  const result = await martyrDB.find().sort({ date: 1 }).toArray();
  res.send(result)
})
app.get("/allmartyr/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await martyrDB.findOne(query)
  res.send(result);
});



app.get("/footage/pending", async (req, res) => {
  const query = { status: 'pending' };
  const result = await footageDB.find(query).sort({ date: 1 }).toArray();
  res.send(result)
})
app.get("/footage/accepted", async (req, res) => {
  const query = { status: 'accepted' };
  const result = await footageDB.find(query).sort({ date: 1 }).toArray();
  res.send(result)
})

app.get("/Martyrs/panding", async (req, res) => {
  const query = { status: 'pending' };
  const result = await martyrDB.find(query).toArray();
  res.json(result);
})
app.get("/Martyrs/accepted", async (req, res) => {
  const query = { status: 'accepted' };
  const result = await martyrDB.find(query).toArray();
  res.json(result);
})

app.get("/AddPerpetrator/panding", async (req, res) => {
  const query = { status: 'pending' };
  const result = await PerpetratorDB.find(query).toArray();
  res.json(result);
})
app.get("/PerpetratorDetails/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await PerpetratorDB.findOne(query);
  res.json(result);
})
app.get("/AddPerpetrator/success", async (req, res) => {
  const query = { status: 'success' };
  const result = await PerpetratorDB.find(query).toArray();
  res.json(result);
})

app.get("/blogs", async (req, res) => {
  const result = await blogDB.find().sort({ _id: -1 }).toArray();
  res.json(result);
});


app.post("/addmartyr", async (req, res) => {
  const martyr = req.body;
  const result = await martyrDB.insertOne(martyr)
  res.send(result)
})
app.post("/addFootage", async (req, res) => {
  const martyr = req.body;
  const result = await footageDB.insertOne(martyr)
  res.send(result)
})

app.post("/AddPerpetrator", async (req, res) => {
  const Perpetrator = req.body;
  const result = await PerpetratorDB.insertOne(Perpetrator)
  res.send(result)
})
app.post("/blog", async (req, res) => {
  const blog = req.body;
  const result = await blogDB.insertOne(blog)
  res.send(result)
})








app.put("/Martyr/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      status: 'accepted',
    }
  };
  const result = await martyrDB.updateOne(filter, updateDoc);
  res.send(result);
});

app.put("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const BlogData = req.body;
  const updateDoc = {
    $set: {
      support: BlogData.support,  // Update the support with the new value
    }
  };

  const result = await blogDB.updateOne(filter, updateDoc);
  res.send(result);
});

app.put("/Perpetrator/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };

  const updateDoc = {
    $set: {
      status: 'success',
    }
  };

  const result = await PerpetratorDB.updateOne(filter, updateDoc);
  res.send(result);
});


app.put("/footage/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };

  const updateDoc = {
    $set: {
      status: 'accepted',
    }
  };

  const result = await footageDB.updateOne(filter, updateDoc);
  res.send(result);
});




app.delete("/allmartyr/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const query = { _id: new ObjectId(id) };
  const result = await martyrDB.deleteOne(query);
  res.send(result)
});

app.delete("/Perpetrator/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await PerpetratorDB.deleteOne(query);
  res.send(result)
});
app.delete("/footage/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await footageDB.deleteOne(query);
  res.send(result)
});


app.get("/", (req, res) => {
  res.send('server is running');
})

app.listen(port, () =>
  console.log('running port is ', port)
)