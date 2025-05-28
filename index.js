import express from 'express';
import cor from 'cors';
import bodyParser from 'body-parser';
import route from './route/index.route.js';


const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cor());

app.use("/api", route);


app.listen(3000, () => {
    console.log(`server is running on port ${3000}`);
})
