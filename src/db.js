'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://localhost/AgroMarketDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(function(db) {
    return console.log('ATHENDAT | e-AgroMarketDB is connected');
}).catch(function(error) {
    return console.log(error);
});

/* mongoose.connect('mongodb+srv://athendat:jHe3kFzeheM2NvZz@cluster0.t0kl5.mongodb.net/eAgroMarket', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    })
    .then((db) => console.log('ATHENDAT | e-AgroMarket DB On Line is connected'))
    .catch((error) => console.log(error)); */

// jHe3kFzeheM2NvZz
// athendat
// mongodb+srv://athendat:jHe3kFzeheM2NvZz@cluster0.t0kl5.mongodb.net/eAgroMarketDB