var mongoose = require('mongoose');
var { Schema } = mongoose;

const FlightsSchema = new Schema({
  tweet_id: String,
  airline_sentiment: String,
  airline_sentiment_confidence: Number,
  negativereason: String,
  negativereason_confidence: Number,
  airline: String,
  name: String,
  retweet_count: Number,
  text: String,
  tweet_created: String,
  tweet_location: String,
  user_timezone: String,
});

var Flights = mongoose.model('Flights', FlightsSchema);

module.exports = Flights;
