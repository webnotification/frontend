import _ from 'lodash';
import mongoose, {Schema} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

let UserSchema = new Schema({
  client_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  website: {
    type: String,
    required: true,
    unique: true,
  },
  is_verified: Boolean,
  created_at : Date
});

UserSchema.plugin(passportLocalMongoose, {usernameField:'email', usernameQueryFields: ['email']});
var User = mongoose.model('User', UserSchema);

export default User;
