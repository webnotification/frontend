import _ from 'lodash';
import mongoose, {Schema} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
var mongoose = require('mongoose');

let UserSchema = new Schema({
  register_id: {
    type: String,
    required: true
});

UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', UserSchema);

export default User;
