import mongoose, {Schema} from 'mongoose';

let ListingSchema = new Schema({
  name: String,
  slug: String,
  listing_type: {
    type: String
  },

  address: Object,

  contact_person: Object,

  members_per_session: Number,
  trainers_per_session: Number,

  establishment_data: Date,

  peak_time: Date
});



export default mongoose.model('Listing', ListingSchema);