import _ from 'lodash';
import mongoose, {Schema} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

let UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phones: [{
    type: String
  }],

  picture: { type: String },
  address: { type: String },

  is_verified: Boolean,
  created_at : Date
});

UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', UserSchema);

export default User;
