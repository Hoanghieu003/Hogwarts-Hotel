const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');

const bodyParser = require('body-parser');

const path = require('path');

//Routes imports
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');

mongoose.connect("mongodb+srv://hoanghieu003:hoangHieu@1999@hieucluster.o53f8.mongodb.net/hogwarts-hotel", { useNewUrlParser: true })
    .then((sucess) => {
        if(process.env.NODE_ENV !== 'production'){
            const fakeDb = new FakeDb();
            // fakeDb.seedDb(); 
        }
});

const app = express();

// middleware order matters
app.use(bodyParser.json());

// middlewares
app.use('/api/v1/rentals',rentalRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

if(process.env.NODE_ENV === 'production'){
    const appPath = path.join(__dirname, '..', 'build');
    app.use(express.static(appPath));
    
    app.get('*', function(req, res){
        res.sendfile(path.resolve(appPath, 'index.html'));
    })
}

const PORT = process.env.PORT || 3001;

app.listen(PORT,() => {
    console.log("server is running");
})