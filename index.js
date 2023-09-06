const express = require('express');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.use(require('./routes'));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB',
    {
        useFindAndModify: false,
      // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
      // by default, you need to set it to false.
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.set ('debug', true);
// This will enable debug mode for Mongoose, which will log all executed collection methods and their arguments to the console.


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`)
});

