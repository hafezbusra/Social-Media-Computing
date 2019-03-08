module.exports = function (app) {
  // frontend routes =========================================================
  //const Freq = require('wordfrequenter')
  const Occurrences = require('occurences');
  //const fetch = require('node-fetch');
  const mongoose = require('mongoose');

  const Flights = mongoose.model('Flights');

  const async = require("async")

  wordstotal = "";
  wcfb = "";
  wctwitter = "";

  app.get('/', function (req, res) {
    res.render('index.pug');
  });

  app.get('/api/data', function (req, res) {
    var arr = {
      totalText: function (callback) {
        Flights
          .estimatedDocumentCount(function (err, docs) {
            if (err) {
              return callback(err)
            }
            return callback(null, docs)
          })
      },
      positivewc: function (callback) {
        Flights.find({ "airline_sentiment": { $eq: "positive" } }).exec(function (err, docs) {
          if (err) {
            return callback(err)
          }
          words = ""
          docs.forEach(function (obj) {
            words = words + obj.text;
          });

          words = words.replace(/ +(?= )/g, '')
          wctwitter = words;
          let wf = new Occurrences(words);
          return callback(null, wf.getSorted())
        });
      },
      negativewc: function (callback) {
        Flights.find({ "airline_sentiment": { $eq: "negative" } }).exec(function (err, docs) {
          if (err) {
            return callback(err)
          }
          words = ""
          docs.forEach(function (obj) {
            words = words + obj.text;
          });

          words = words.replace(/ +(?= )/g, '')
          wctwitter = words;
          let wf = new Occurrences(words);
          return callback(null, wf.getSorted())
        });
      },
      neutralwc: function (callback) {
        Flights.find({ "airline_sentiment": { $eq: "neutral" } }).exec(function (err, docs) {
          if (err) {
            return callback(err)
          }
          words = ""
          docs.forEach(function (obj) {
            words = words + obj.text;
          });

          words = words.replace(/ +(?= )/g, '')
          wctwitter = words;
          let wf = new Occurrences(words);
          return callback(null, wf.getSorted())
        });
      },
      flightSentiment: function (callback) {
        const newTime = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 365))
        Flights.aggregate([
          {
            "$project": {
              "airline": "$airline",
              "pos": {
                "$cond": [{ "$eq": ["$airline_sentiment", "positive"] }, 1, 0]
              },
              "neg": {
                "$cond": [{ "$eq": ["$airline_sentiment", "negative"] }, 1, 0]
              },
              "neu": {
                "$cond": [{ "$eq": ["$airline_sentiment", "neutral"] }, 1, 0]
              }
            }
          },
          {
            "$group": {
              "_id": "$airline",
              "positive": { "$sum": "$pos" },
              "negative": { "$sum": "$neg" },
              "neutral": { "$sum": "$neu" },
            }

          },
          { "$sort": { "_id": 1 } }
        ], function (err, docs) {
          if (err) {
            return callback(err)
          }
          return callback(null, docs)
        });
      },
      negativeReason: function (callback) {
        const newTime = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 365))
        Flights.aggregate([
          {
            "$project": {
              "airline": "$airline",
              "sentiment": "$airline_sentiment",
              "badFlight": {
                "$cond": [{ "$eq": ["$negativereason", "Bad Flight"] }, 1, 0]
              },
              "cantTell": {
                "$cond": [{ "$eq": ["$negativereason", "Can't Tell"] }, 1, 0]
              },
              "lateFlight": {
                "$cond": [{ "$eq": ["$negativereason", "Late Flight"] }, 1, 0]
              },
              "customerServiceIssue": {
                "$cond": [{ "$eq": ["$negativereason", "Customer Service Issue"] }, 1, 0]
              },
              "FlightBookingProblem": {
                "$cond": [{ "$eq": ["$negativereason", "Flight Booking Problems"] }, 1, 0]
              },
              "LostLuggage": {
                "$cond": [{ "$eq": ["$negativereason", "Lost Luggage"] }, 1, 0]
              },
              "flightAttendantComplaint": {
                "$cond": [{ "$eq": ["$negativereason", "Flight Attendant Complaints"] }, 1, 0]
              },
              "cancelledFlight": {
                "$cond": [{ "$eq": ["$negativereason", "Cancelled Flight"] }, 1, 0]
              },
              "damageLuggage": {
                "$cond": [{ "$eq": ["$negativereason", "Damaged Luggage"] }, 1, 0]
              },
              "longlines": {
                "$cond": [{ "$eq": ["$negativereason", "longlines"] }, 1, 0]
              }
            }
          },
          {
            "$match":
            {
              "sentiment": {
                "$eq": "negative"
              },
            }
          },
          {
            "$group": {
              "_id": {
                "airline": "$airline"
              },
              "Bad Flight": { "$sum": "$badFlight" },
              "Cannot Tell": { "$sum": "$cantTell" },
              "Late Flight": { "$sum": "$lateFlight" },
              "Customer Service Issue": { "$sum": "$customerServiceIssue" },
              "Flight Booking Problem": { "$sum": "$FlightBookingProblem" },
              "Lost Luggage": { "$sum": "$LostLuggage" },
              "Flight Attendant Complaint": { "$sum": "$flightAttendantComplaint" },
              "Cancelled Flight": { "$sum": "$cancelledFlight" },
              "Damage Luggages": { "$sum": "$damageLuggage" },
              "Long Lines": { "$sum": "$longlines" }
            }

          },
          { "$sort": { "_id": 1 } }
        ], function (err, docs) {
          if (err) {
            return callback(err)
          }
          return callback(null, docs)
        });
      },
      totalSentiment: function (callback) {
        const newTime = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 365))
        Flights.aggregate([
          {
            "$project": {
              "pos": {
                "$cond": [{ "$eq": ["$airline_sentiment", "positive"] }, 1, 0]
              },
              "neg": {
                "$cond": [{ "$eq": ["$airline_sentiment", "negative"] }, 1, 0]
              },
              "neu": {
                "$cond": [{ "$eq": ["$airline_sentiment", "neutral"] }, 1, 0]
              }
            }
          },
          {
            "$group": {
              "_id": "$airline",
              "positive": { "$sum": "$pos" },
              "negative": { "$sum": "$neg" },
              "neutral": { "$sum": "$neu" },
            }

          },
          { "$sort": { "_id": 1 } }
        ], function (err, docs) {
          if (err) {
            return callback(err)
          }
          return callback(null, docs)
        });
      },
    }
    async.parallel(arr, function (err, docs) {
      if (err) {
        return res.status(400).json({
          failed: "failed to retrieve data"
        })
      }
      if (docs) {
        return res.json({
          totalText: docs.totalText,
          positivewc: docs.positivewc,
          negativewc: docs.negativewc,
          neutralwc: docs.neutralwc,
          flightSentiment: docs.flightSentiment,
          negativeReason: docs.negativeReason,
          totalSentiment: docs.totalSentiment

        });
      }

    });
  });

  app.get('/pass', (req, res) => {
    res.send("hello!");      // localhost:port/pass will return hello 
  })

}