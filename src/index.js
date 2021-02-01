'use strict';

var app = require('./app');

var app2 = _interopRequireDefault(app);

require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configuraciones
app2.default.set('port', process.env.PORT || 3000);

// Ejecutar el servidor
app2.default.listen(app2.default.get('port'), function() {
    console.log('ATHENDAT | e-Commerce Orchesta Director is running on port:', app2.default.get('port'));
});