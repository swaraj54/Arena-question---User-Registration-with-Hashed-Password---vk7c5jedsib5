const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require("fs");
const seedWithDummyData = require("./../seeder");

dotenv.config();

//connect to DB
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

const url = process.env.DATABASE_URL || "mongodb://0.0.0.0:27017/users";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
    console.log("Db conected..")
    // await seedWithDummyData();
}).catch((error) => {
    console.log(error)
})


app.listen(3000, () => console.log('Server running......'));
