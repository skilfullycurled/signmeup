var mongoose = require( 'mongoose' );
var Event = require('../models/event.js');
var User = require('../models/user.js');
var Twilio = require('twilio-js');

exports.submit = function(req, res){
  console.log(req.route);
  res.render('createEvent', { title: 'create a new event' });
};

exports.create = function(req, res){
  
	
	console.log("POST: ");
	console.log(req.body);

	new Event({
		
		//posted is included in default
		title: req.body.title,
		venue: { name: req.body.venue_name, location: req.body.venue_location },
  		begins: req.body.begins,
  		ends: req.body.ends,
  		desc: req.body.desc,
  		ward: req.body.ward,
  		hood: req.body.hood,
  		issues: req.body.issues,
  		signup_code: req.body.signup_code

	}).save(function(err, event) {
		if(!err){
			console.log(event);
			return console.log("created");
		} else {
			return console.log(err);
		}
	});
		
  res.render('createEvent', { title: 'create a new event' });
};

exports.attendees = function(req, res){
	
  	Event.findOne({ signup_code: req.params.signup_code }, function (err, event) {
  		res.render('listAttendees', { title: 'list attendees', event: event } );
  	});
  	
};

exports.listAll = function(req, res){
	
  	Event.find(function (err, events) {
  		
  		if(!err){
  			res.render('listEvents', { title: 'list events', events: events } );
  			//res.send(events);
  		} 
  		
  		else {
  			return console.log(err);
  		};
  	
  	});  	
};

exports.signUp = function(email, event, callback) {
	
	event.attendees.push(email);
	
	event.save(function(err){
		
		if (err) {
			
			callback(err);
		
		} else {
			
			callback(null);
		}
	});
}









