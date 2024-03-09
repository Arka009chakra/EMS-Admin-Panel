const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const m = require("./mongodb");
const m1 = require("./mongodb1");
const m2 = require("./mongodb2");
const crypto = require("crypto");
const key = "adnan-tech-programming-computers";
const algo = "aes-256-cbc";
const moment = require('moment');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", async (req, res) => {
    try {
        const { email, cemail, name, psw, role} = req.body;

        const result = await m.findOne({ cemail });
        if (result) {
            return res.status(400).json({ message: 'Email Already Registered!!' });
        }

        const cipher = crypto.createCipher(algo, key);
        const encryptedPsw = cipher.update(psw, "utf-8", "hex") + cipher.final("hex");

        const newUser = await m.create({
            email,
            cemail,
            name,
            password: encryptedPsw,
            role
        });

        res.status(201).json({ message: 'Account created successfully!' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.post('/login', async (req, res) => {
    try {
        const result = await m.findOne({ cemail: req.body.cemail });

        if (!result) {
            return res.status(400).json({ message: 'Email Not Registered!!' });
        } else {
            const password = req.body.psw; // Changed from req.body.password to req.body.psw

            var cipher = crypto.createCipher(algo, key);
            var encrypted = cipher.update(password, "utf-8", "hex") + cipher.final("hex");

            if (result.password === encrypted) {
                return res.status(200).json({ message: 'Login successfully!' });
            } else {
                return res.status(400).json({ message: 'Password Incorrect!!' });
            }
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post("/mail", (req, res) => {
    // Set CORS headers
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    
    // Extract email address and other details from request body
    const { email, cemail, name, psw, role } = req.body;

    // Ensure required fields are provided
    if (!cemail || !psw) {
        return res.status(400).json({ message: 'Email and password are required!' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "arka9791chakraborty@gmail.com",
            pass: "pqekcnudstwndcfr", // Replace with your actual password
        },
    });
    
    // Email content
    const mailOptions = {
        from: "admin@arkatech.com",
        to: email,
        subject: "Hello Arka",
        text: `Username: ${cemail}\nPassword: ${psw}\nRole:${role}`
    };
    
    // Send the email with error handling
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error sending email:", err);
            return res.status(500).json({ message: 'Failed to send email!' });
        } else {
            console.log("Email sent:", info.response);
            return res.status(200).json({ message: 'Email Sent!!' });
        }
    });
});

app.post("/update", async (req, res) => {
    const { cemail, role } = req.body;

    try {
        // Find user by email
        const result = await m.findOne({ cemail });

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user's role
        await result.updateOne({ $set: { role } });

        return res.status(200).json({ message: 'User role updated successfully' });
    } catch (error) {
        console.error("Error updating user role:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post("/getdata", async (req, res) => {
    try {
        const data = await m.find();
        res.json(data);
    } catch (error) {
        res.json("error");
    }
});

app.post("/task", async (req, res) => {
    try {
        const { cemail, task} = req.body;

        const result = await m1.findOne({ cemail });
        if (result && task) {
            await result.updateOne({ $set: { task } });
            return res.status(200).json({ message: 'New task update successfully!!!!' });
        }
        else{
            const x = await m1.create({
                cemail,
                task
            });
    
            res.status(201).json({ message: 'New task asssign successfully!!!!' }); 
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});  


app.post("/leave",async(req,res)=>{
    try {
        const data4 = await m2.find();
        res.json(data4);
    } catch (error) {
        res.json("error");
    }
})
app.post('/delete/:id',async(req,res)=>{
    let user = req.params.id;

})


app.post('/approve/:id',async(req,res)=>{
    res.status(500).json({ message: 'Approved' });
})

app.post("/yo",async(req,res)=>{
    try {
        const data41 = await m.find();
        res.json(data41);
    } catch (error) {
        res.json("error");
    }
})

app.listen(5485);

