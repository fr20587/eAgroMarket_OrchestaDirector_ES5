'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose.Schema({
    user: { ref: "User", type: _mongoose.Schema.Types.ObjectId },
    email: { type: String, required: true, unique: true, minlength: 6, maxlength: 20 },
    password: { type: String, required: true, minlength: 8 },
    name: { type: String, required: true, maxlength: 20 },
    lastName: { type: String, required: true, maxlength: 20 },
    roles: [{ ref: "Role", type: _mongoose.Schema.Types.ObjectId }],

    phone: { type: String, minlength: 7, maxlength: 20 },
    img: { type: String },
    gender: { type: String },
    birthday: { type: String },

    address: { type: String },
    street1: { type: String },
    street2: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { typr: String },
    info: { type: String }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async function(password) {
    var salt = await _bcrypt2.default.genSalt(13);
    return await _bcrypt2.default.hash(password, salt);
};

userSchema.statics.comparePassword = async function(password, receivedPassword) {
    return await _bcrypt2.default.compare(password, receivedPassword);
};

exports.default = (0, _mongoose.model)('User', userSchema);