const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');

const app = express();
const port = process.env.PORT ||5000;

app.use(cors());
app.use(express.json());

//
//


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://authentication:FZOoo069jPW9a1c3@cluster0.keshe.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run () {

    try{
        const userCollection = client.db('users').collection('drawingUsers');

        app.post('/register', async(req, res)=> {
            const user = req.body;
            const email = req.body.email;
            const query = {email: email};
            const oldUser = await userCollection.find(query).toArray();
            if(oldUser.length === 0){
               const result = await userCollection.insertOne(user);
               res.send({status: true})
            }
            else{
                res.send({status: 'Email is already used.'})
            }
            
         });

         app.post('/login', async(req, res)=> {
            const user = req.body;
            console.log(user);
            const email = req.body.email;
            const password = req.body.password;
            const query = {email: email, password: password};
            const oldUser = await userCollection.find(query).toArray();
            if(oldUser.length === 0){
                res.send({status: 'Email and password is not correct'})
            }
            else{
                res.send({status: true})
            }
            
         })
          
            
    }
    finally{

    }
}

run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send('hello from drawing server')
});

app.listen(port, () => {
    console.log('Listening to port', port)
})