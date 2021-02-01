'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clientSchema = new _mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    name: { type: String, required: true },
    lastName: { type: String, maxlength: 20 },
    phone: { type: String, maxlength: 20 },
    img: { type: String },
    role: { ref: "Role", type: _mongoose.Schema.Types.ObjectId },
    gender: { type: String, required: false },
    birthday: { type: String, required: false },
    city: { ref: "City", type: _mongoose.Schema.Types.ObjectId },
    address: { type: String, required: false },
    street1: { type: String, required: false },
    street2: { type: String, required: false }
}, {
    timestamps: true,
    versionKey: false
});

clientSchema.statics.encryptPassword = async function(password) {
    var salt = await _bcrypt2.default.genSalt(13);
    return await _bcrypt2.default.hash(password, salt);
};

clientSchema.statics.comparePassword = async function(password, receivedPassword) {
    return await _bcrypt2.default.compare(password, receivedPassword);
};

// Método para no enviar el password en las respuestas
clientSchema.method('toJSON', function() {
    const { password, ...object } = this.toObject();
    return object;
});

exports.default = (0, _mongoose.model)('Client', clientSchema);