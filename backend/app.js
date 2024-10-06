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
app.use("/expenses", routes);

app.listen(PORT,() => {
    console.log(`Server listening on port ${PORT}...`);
});

// Database connection
mongoose 
.connect(process.env.MONGODB_CONNECT_STRING)
.then(() => console.log("Success: The database has been connected to MongoDB."))
.catch((err)=> console.log("ERROR. DB NOT CONNECTED."))
