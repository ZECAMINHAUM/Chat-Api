const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const db = new JsonDB(new Config("../data/DB", true, true, '/'));

module.exports = {

    getMessages() {
        try {
            return { success: true, data: db.getData() };
        } catch (err) {
            return { success: false, err };
        }
    },

    sendMessage(data) {
        try {
            db.push('/Messages', { data }, false);
            db.save();
            return { success: true };
        } catch (err) {
            return { success: false, err };
        }
    }
}