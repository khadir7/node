const note_routes = require('./note_routes');

module.exports = function(app, db) {
    note_routes(app, db)
}