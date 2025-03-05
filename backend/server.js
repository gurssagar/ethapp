var express = require('express');
var cors=require('cors');
require('dotenv').config();
const fetch=(...args) => import ('node-fetch').then(({default :fetch}) => fetch(...args));
var bodyParser=require('body-parser');
const CLIENT_ID = 'Ov23liYe2P4o4RO7y4No';
const CLIENT_SECRET='44ea4c12fcc37815ac3708307f5ca6b50152e4d9';
var mongoose = require('mongoose');
const { type } = require('os');
var app=express();


 app.use(cors({
    origin: ['http://localhost:3000', 'https://ethapp-kg2k.vercel.app',"https://www.gitfund.tech"],
    credentials: true
 }
 ));
 app.use(bodyParser.json());


 //Mongoose Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to the server..."));

//Database Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['user', 'admin'] },
    walletAddress: { type: String, unique: true, sparse: true },
}, { timestamps: true });

const walletSchema = new mongoose.Schema({
    username: { type: String, required: true },
    walletAddress: { type: String, required: true },
}, { timestamps: true });

// Create a Mongoose schema for bounties
const bountySchema = new mongoose.Schema({
    title: { type: String, required: true },
    githubRepoOwner: { type: String, required: true },
    oneLiner: { type: String, required: true },
    description: { type: String, required: true },
    githubRepo: { type: String, required: true },
    githubIssue: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
    rewardAmount: { type: Number, required: true },
    paymentToken: { type: String, required: true },
    isLive: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const contributeUserScheme = new mongoose.Schema({
    contributorUsername: { type: String, required: true },
    githubRepo: { type: String, required: true },
    repoOwner: { type: String, required: true },
    accepted:{type:Boolean,required:true,default:false},
}, { timestamps: true });

const ContributeRequestSchema = new mongoose.Schema({
    contributorUsername: { type: String, required: true },
    githubRepo: { type: String, required: true },
    repoOwner: { type: String, required: true },
    walletAddress: { type: String, required: true },
    prLink:{type:String,required:true},
    accepted: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const contributeRequest=mongoose.model('contributeRequest',ContributeRequestSchema);
const assignBounty=mongoose.model('AssignBounty', bountySchema);
const Bounty = mongoose.model('Bounty', bountySchema);
const Wallet = mongoose.model('Wallet', walletSchema);
const User = mongoose.model('User', userSchema);
const ContributeUsers = mongoose.model('ContributeUser', contributeUserScheme);


app.get("/api/contributeRequest",async(req,res)=>{
    try {
        const contributeReq = await contributeRequest.find();
        res.status(200).json(contributeReq);
    } catch (error) {
        console.error('Error fetching contributions:', error);
        res.status(500).json({ message: 'Failed to fetch contributions' });
    }
    })
app.post('/api/contributeRequest',async(req,res) => {
    const contributeReq = req.body;
    console.log(contributeReq,"temp");
    const contributeUser = new contributeRequest(contributeReq);
    try {
        await contributeUser.save();
        res.status(201).json({ message: 'Contribution saved successfully' });
    } catch (error) {
        console.error('Error saving contribution:', error);
        res.status(500).json({ 
            error: 'Failed to save contribution',
            message: error.message 
        });
    }
    
})



app.patch('/api/contributeRequest', async (req, res) => {
    const { repoOwner } = req.body;
    
    try {
        const updatedContribution = await ContributeUsers.findOneAndUpdate(
            { repoOwner: repoOwner },
            { $set: req.body },
            { new: true }
        );

        if (!updatedContribution) {
            return res.status(404).json({ error: 'Contribution not found' });
        }

        res.status(200).json({ 
            message: 'Contribution updated successfully',
            contribution: updatedContribution 
        });
    } catch (error) {
        console.error('Error updating contribution:', error);
        res.status(500).json({ 
            error: 'Failed to update contribution',
            message: error.message 
        });
    }
});

app.get("/api/contribute", async (req, res) => {
    try {
        const contributions = await ContributeUsers.find();
        res.status(200).json(contributions);
    } catch (error) {
        console.error('Error fetching contributions:', error);
        res.status(500).json({ message: 'Failed to fetch contributions' });
    }
});

app.post("/api/contribute", async (req, res) => {
    const contributeData = req.body;
    console.log(contributeData,"temp");
    const contributeUser = new ContributeUsers(contributeData);
    try {
        await contributeUser.save();
        res.status(201).json({ message: 'Contribution saved successfully' });
    } catch (error) {
        console.error('Error saving contribution:', error);
        res.status(500).json({ 
            error: 'Failed to save contribution',
            message: error.message 
        });
    }
});
// Apply the middleware to the POST route
app.post('/api/bounties', async (req, res) => {
    try {
        const bountyData = req.body;
        console.log('Received bounty data:', bountyData);

        const savedBounty = await Bounty.create(bountyData);
        console.log('Assign Bounty:', savedBounty);

        res.status(201).json(savedBounty);
    } catch (error) {
        console.error('Error creating bounty:', error);
        res.status(500).json({ 
            error: 'An error occurred',
            details: error.message 
        });
    }
});

// GET route to retrieve bounties
app.get('/api/bounties', async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page ) : 1;
    const limit = 5; // adjust this to change the number of items per page

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const countBounties = await Bounty.countDocuments();
    const totalPages = Math.ceil(countBounties / limit);

    const bounties = await Bounty.find()
    .skip(startIndex)
    .limit(limit)
    .sort({ _id: -1 });
    ;

    // Include total pages in the response
    res.json({
      data: bounties,
      totalPages,
      currentPage: page,
      totalCount: countBounties,
    });
  } catch (error) {
    console.error('Error retrieving bounties:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

//Github Auth
 app.get('/getAccessToken', async (req, res) => {
     req.query.code;
     const params = "?client_id=" + CLIENT_ID+"&client_secret=" + CLIENT_SECRET +"&code=" + req.query.code;
     try {
         await fetch("https://github.com/login/oauth/access_token" + params, {
             method: "POST",
             headers: {
                 "Accept": "application/json"
             }
         }).then((response) => {
             return response.json()
         }).then((data) => {
             console.log(data);
             res.json(data)
         })
     }catch(error){
         console.log(error);
     }
 })


//Github User
app.get('/getUserData',async (req, res) => {
    req.get("Authorization");
    await fetch("https://api.github.com/user", {
        method:"GET",
        headers:{
            Authorization:req.get("Authorization")
        }
    }).then((response) => {
        return response.json()}
    ).then((data) =>{
        console.log(data);
        res.json(data);
    })
})
 app.listen(4000, () => {
     console.log(`Listening on 4000`);
 })