var characters = require ('../data/charObj.js')
var user_picks = require ('../assets/javascript/script.js')
console.log(characters);


module.exports = function (app){
    // app.post('/api/characters', function (req,res){
    //     console.log(req.body.char);
    // });
    app.get('/api/characters', function (req,res){
        res.send(characters);        
    })

    app.get('/api/user_picks', function (req,res){
        res.send(characters);
    })
}