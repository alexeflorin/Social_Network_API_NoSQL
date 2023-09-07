const mongoose = require('mongoose');



const connection = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set("debug", true);
// Use to log mongo queries 



module.exports = connection;
