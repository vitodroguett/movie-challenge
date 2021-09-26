const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;
const cluster = process.env.MONGO_CLUSTER;
const dbname = process.env.MONGO_DB;

const db = {
    uri: `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};

module.exports = db;
