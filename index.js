const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
// const { query } = require('express');
const app = express();
const port = process.env.Port || 5000;

app.get('/', (req, res) => {
    res.send('Simple node Server running');
})

app.use(cors());
app.use(express.json())

const users = [
    { id: 1, name: 'Sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'Sabnoor', email: 'sabnoor@gmail.com' },
    { id: 3, name: 'Sabila', email: 'sabila@gmail.com' },

]

// username: dbuser1
// password: syKat8kAy2caYM1E

const uri = "mongodb+srv://dbuser1:syKat8kAy2caYM1E@mangoodbfirstproject.65jgjko.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db("simpledb").collection("users");
        // const user = { name: 'Saheila', email: 'shaila232@gmail.com' };
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async (req, res) => {
            // console.log('Post APi called');
            const user = req.body;
            // user.id = users.length + 1;
            // users.push(user)
            // console.log(user);
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId
            res.send(user);
        })
    }
    finally {
    }
}
run().catch(err => console.log(err));


// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
//         res.send(filtered);
//     }
//     else {
//         res.send(users);
//     }
// })

// app.post('/users', (req, res) => {
//     // console.log('Post APi called');
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user)
//     console.log(user);
//     res.send(user);
// })

app.listen(port, () => {
    console.log(`Simple not server running on port${port}`);
})