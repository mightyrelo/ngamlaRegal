const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String,
    createdOn: {
        type: Date,
        'default': Date.now
    },
    completedQuotes : {
        type: Number,
        required: true,
        'default': 0
    },
    completedInvoices : {
        type: Number,
        required: true,
        'default': 0
    },
    completedPOs : {
        type: Number,
        required: true,
        'default': 0
    }
});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');
};

UserSchema.methods.validPassword = function(password){
    const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
    return (hash === this.hash);
};

UserSchema.methods.generateJwt = function(){
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000, 10),
    }, 'thisIsSecret' );
};

mongoose.model('User', UserSchema);