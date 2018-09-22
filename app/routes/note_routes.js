var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db){
    app.post('/notes', (req, res) => {

        // You'll create your note here.
        // console.log("note collection:::::", db.collection('notes'))
        console.log("request object::::", req.body)
        const note = {
            title: req.body.title,
            data: req.body.data
        }
        db.collection('notes').insert(note, (err, results) => {
            if(err){
                res.send({err: "An error has occured"});
            }else{
                res.send(results.ops[0])
            }
        })
        // res.send('Hello')
    })

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            _id: new ObjectID(id)
        }
        db.collection('notes').findOne(details, (err, results) => {
            if(err){
                res.send({err:"An error has occured"})
            }else{
                res.send(results)
            }
        })
    })

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            _id: new ObjectID(id)
        }
        db.collection('notes').remove(details, (err, results) => {
            if(err){
                res.send({err:"An error has occured"})
            }else{
                res.send("This item("+id+") is deleted")
            }
        })
    })

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {
            _id: new ObjectID(id)
        }
        const note = {
            title: req.body.title,
            data: req.body.data
        }
        db.collection('notes').update(details, note, (err, results) => {
            if(err){
                res.send({err:"An error has occured"})
            }else{
                res.send(note)
            }
        })
    })
}