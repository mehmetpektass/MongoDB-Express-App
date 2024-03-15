const {MongClient, MongoClient} = require ('mongodb');

async function connectToMongoDB(){

    const url = 'mongodb://localhost:27017/library'
    const dbName = 'library'

    try {
        const client = await MongoClient.connect(url);
        console.log('The connection is successful')
        let db = client.db(dbName);
        return db;
    } catch (error) {
        console.log('There is a connection issue');
        throw error;
    }
}

module.exports = connectToMongoDB;