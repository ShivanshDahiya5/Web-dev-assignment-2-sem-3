import express from 'express'
import router from './routes/studentRoutes.js';
import logger from './middleware/logger.js';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(router)
app.use(logger)

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.listen(3000, ()=>{
    console.log("Server has been started at port: ", 'http://localhost:3000');
})