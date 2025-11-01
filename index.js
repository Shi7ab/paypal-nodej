require('dotenv').config();
const express = require('express');
const path = require('path')
const DBconnection = require('./config/db');
const AuthRouter = require('./routers/AuthRouter');
const PayRouter = require('./routers/PayRouter');
const notifcationRouter = require('./routers/NotificationRouter')
const authMidelware = require('./midelware/authMidelware');
 

const app = express();
const port = process.env.PORT || 5000;


DBconnection()
// app.use(express.json());
app.set('view engine', 'ejs');

app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))

// Routes
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/payment',  PayRouter);
app.use('/api/v1', notifcationRouter);


app.get('/', (req, res) => {
   //res.send('Hello World!')
   const data = {
    title:'welcom ejs',
    message:'hello from Nodejs'
   }
   res.render('index',data)
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});