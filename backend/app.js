// import dependencies 
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from "./routes/routes.js";
import mongoose from 'mongoose';


const PORT = process.env.PORT;
const app = express();

// Middlewares
app.use(express.json());  // REST needs JSON MIME type.
app.use(cors());          // Help in accessing server 
app.use("/", routes);

app.listen(PORT,() => {
    console.log(`Server listening on port ${PORT}...`);
});

// Database connection
mongoose 
.connect(process.env.MONGODB_CONNECT_STRING)
.then(() => console.log("Success: The database has been connected to MongoDB."))
.catch((err)=> console.log("ERROR. DB NOT CONNECTED."))

// ------DEPLOYMENT---------
const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1, '/frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'));
    })

} else {
    app.get("/", (req, res) => {
        res.send("API is running successfully.")
    });
}

// ------DEPLOYMENT---------
