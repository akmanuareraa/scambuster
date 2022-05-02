const express = require('express')
const fs = require('fs')
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const https = require("https")
//const sendMail = require('./mailservice')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
//const Moralis = require("moralis/node");
const linkpreview = require('link-preview-js')
const Pageres = require('pageres')
const dotenv = require('dotenv');
dotenv.config();

const redis = require('redis');

const client = redis.createClient();

client.connect();


const serverUrl = "https://lbn4bdcyigza.usemoralis.com:2053/server";
const appId = "sj9S2QaFxz3JkackdDjSBnBR5KIjwpbVgeWV7fQe";

const app = express()
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

const validatorabi = require('./validatorABI')
const protonabi = require('./protonABI')
const config = {
    private: "7526f47bfe4f3316f4f7d94c1fa978b27741f8de0d1d09a39120bb2a54400e6a",
    rpc: "https://speedy-nodes-nyc.moralis.io/5a65aeefd6cc8930e6f47455/polygon/mumbai",
    ownerAddress: "0xcc1eB02Fa619dceb2dBd69BbAd7Dcd6C10063a37",
    protonAddress: "0x2e7d2fFeAA3eD4EC2FcB6068B735347766063Adb",
    valAddress: "0xaC4228A108138acb86d829D6A4B09d0178200fDd"
}

const httpsServer = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
httpsServer.listen(7171, () => {
    console.log('HTTPS Server Started @ 7171 ')
})


// app.listen(5000, () => {
//     console.log('HTTP Server Started @ 5000')
// })
app.use(express.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));

app.post("/sendinvite", function (req, res) {
    console.log("Reached here", req.body);
    sendInvite(req.body).then(function (response, err) {
        console.log("RESPONSE", response)
        if (response) {
            if (response === 'success') {
                res.status(200).json({ Status: response })
            } else {
                res.status(200).json({ Status: response })
            }
        }
        else {
            res.status(500).json({ error: err })
        }
    })
})

async function sendInvite(data) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            //user: process.env.USER,
            //pass: process.env.PASS
            user: 'howdy@mecasso.io',
            pass: 'Crawling@123'
        }
    });

    let linkEnd = Math.floor((Math.random() * 10000000) + 1);
    console.log("parameters", data.body, linkEnd)



    client.on('error', (err) => console.log('Redis Client Error', err));

    //await client.connect();   

    await client.set(linkEnd, data.body);

    console.log("written to redis");
    var mailOptions = {
        from: 'howdy@mecasso.io',
        to: data.to,
        subject: "Invitation to be a Scambuster validator",
        text: "Hello,\nYou have been invited to be a validator on Scambuster \nPlease follow this link to verify: https://scambuster.io/verifylink/" + linkEnd
    };

    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                resolve(error)
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info.response)
            }
        });
    })
}

app.post('/mint', function (req, res) {

    const owner = new HDWalletProvider(config.private, config.rpc)
    const web3 = new Web3(owner)
    const protonABI = JSON.parse(protonabi);
    const contract = new web3.eth.Contract(protonABI, config.protonAddress)

    console.log("Reached here", req.body)
    console.log("txns counts: ", web3.eth.getTransactionCount("0xcc1eB02Fa619dceb2dBd69BbAd7Dcd6C10063a37"))
    contract.methods.mint(req.body.address, Web3.utils.toWei("1")).send({ from: config.ownerAddress }, function (error, transactionHash) {
        if (error) {
            console.log("Error at mint charm");
        }
    })
        .on('error', function (error) {
            console.log("error at mintcharm", error)
            res.status(500).json({ Status: error })
        })
        .on('transactionHash', function (transactionHash) {
            console.log("txHash", transactionHash);
        })
        .on('receipt', function (receipt) {
            console.log("receipt", receipt);
            res.status(200).json({ Status: receipt })
        });
})


app.post('/mintValidator', function (req, res) {

    const owner = new HDWalletProvider(config.private, config.rpc)
    const web3 = new Web3(owner)
    const protonABI = JSON.parse(protonabi);
    const contract = new web3.eth.Contract(protonABI, config.protonAddress)

    console.log("Reached here", req.body)
    console.log("txns counts: ", web3.eth.getTransactionCount("0xcc1eB02Fa619dceb2dBd69BbAd7Dcd6C10063a37"))
    contract.methods.mint(req.body.address, Web3.utils.toWei("25")).send({ from: config.ownerAddress }, function (error, transactionHash) {
        if (error) {
            console.log("Error at mint");
        }
    })
        .on('error', function (error) {
            console.log("error at mint", error)
            res.status(500).json({ Status: error })
        })
        .on('transactionHash', function (transactionHash) {
            console.log("txHash", transactionHash);
        })
        .on('receipt', function (receipt) {
            console.log("receipt", receipt);
            res.status(200).json({ Status: receipt })
        });
})
//app.post('/getpreview', function (req, res) {
//    console.log("Reached here", req.body.url)
//    linkpreview.getLinkPreview(req.body.url).then((data) =>
//        res.status(200).json({ Status: data })
//    );
//})

app.post('/getpreview', async function (req, res) {
    console.log("Reached here", req.body.url)
    try {
        let image = await new Pageres({ delay: 2, crop: true })
            .src(req.body.url, ['1000x720'])
            .dest('E:\\Blockchain\\Projects\\scambuster\\Backend\\')
            .run();

        console.log('Finished generating screenshots!', image);
        res.status(200).json({ Status: image })
    } catch (error) {
        res.status(200).json({ Status: "Error" })
    }
})

app.post('/validatormint', function (req, res) {

    const owner = new HDWalletProvider(config.private, config.rpc)
    const web3 = new Web3(owner)
    const protonABI = JSON.parse(protonabi);
    const contract = new web3.eth.Contract(protonABI, config.protonAddress)

    console.log("Reached here", req.body)
    //console.log("txns counts: ", web3.eth.getTransactionCount("0xcc1eB02Fa619dceb2dBd69BbAd7Dcd6C10063a37"))
    contract.methods.mint(req.body.address, 25).send({ from: config.ownerAddress }, function (error, transactionHash) {
        if (error) {
            console.log("Error at mint charm");
        }
    })
        .on('error', function (error) {
            console.log("error at mintcharm", error)
            res.status(500).json({ Status: error })
        })
        .on('transactionHash', function (transactionHash) {
            console.log("txHash", transactionHash);
        })
        .on('receipt', function (receipt) {
            console.log("receipt", receipt);
            res.status(200).json({ Status: receipt })
        });
})

app.get('/getSiteStatus', function (req, res) {
    console.log("Reached here", req.query)
    // res.status(200).json({ Data:"TRUE", URL: req.query.url})

    const owner = new HDWalletProvider(config.private, config.rpc)
    const web3 = new Web3(owner)
    const validatorABI = JSON.parse(validatorabi);
    const contract = new web3.eth.Contract(validatorABI, config.valAddress)

    contract.methods.getVoteStatus(req.query.url).call({ from: config.address }).then(function (response, error) {
        if (response) {
            console.log(response)
            res.status(200).send({ Data: response })
        } else {
            console.log(error)
        }
    })
})

app.post('/getSiteStatus', function (req, res) {
    console.log("Reached here", req.body.url)
    // res.status(200).json({ Data:"TRUE", URL: req.query.url})

    const owner = new HDWalletProvider(config.private, config.rpc)
    const web3 = new Web3(owner)
    const validatorABI = JSON.parse(validatorabi);
    const contract = new web3.eth.Contract(validatorABI, config.valAddress)

    contract.methods.getVoteStatus(req.body.url).call({ from: config.address }).then(function (response, error) {
        if (response) {
            console.log(response[1]);
            res.status(200).send({ status: response[1] })
        } else {
            console.log(error)
        }
    })

})

app.post('/confirmlinkEnd', function (req, res) {

    console.log(req.body, "body")

    confirmlink(req.body.linkEnd).then(function (response, err) {

        res.status(200).json({ address: response })

    })

})

async function confirmlink(linkEnd) {

    //await client.connect();   

    const address = client.get(linkEnd);

    return address;
}

