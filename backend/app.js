// import dependencies 
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from "./routes/routes.js";
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve dirname for ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
const _dirname = path.resolve()
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(_dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname, '../frontend', 'build', 'index.html'));
    })

} else {
    app.get("/", (req, res) => {
        res.send("API is running successfully.")
    });
}

// ------DEPLOYMENT---------
