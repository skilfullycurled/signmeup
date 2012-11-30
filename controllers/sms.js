var Twilio = require('twilio-js');
var Event = require('../models/event.js');
var User = require('../models/user.js');
var events = require('../controllers/events.js');


Twilio.AccountSid = config.twilio.accountSID;
Twilio.AuthToken  = config.twilio.authToken;
smu_number = config.twilio.number;

exports.router = function(req, res){
	
	console.log(req.cookies);
  	//console.log(req.route);
  	//console.log(req.body);
  	  
  	var msg = req.body.Body.toLowerCase();
	var phone = req.body.From;
  	var route = req.cookies.route;

  	if(msg === 'clear'){

  		console.log('clearing cookies');
  		res.clearCookie('route');
  		res.clearCookie('user');
  		res.clearCookie('event');
  		res.clearCookie('signup_code');
  		res.send('<Response></Response>');
  
 	 } else if(msg === 'save'){
 	 	
 	 	console.log('saving user');
 	 	
 	 	new User({
		
			//posted is included in default
			phone: phone,
			email: req.cookies.user.email

		}).save(function(err, user) {
			if(!err){
				
				console.log("user created");
	
		 		res.cookie('user', {registered: true});
				res.send('<Response></Response>');
				
				Twilio.SMS.create({
					to: req.body.From, 
					from: smu_number, 
					body: "Information saved.  Text 'forget' to turn off single text signup at anytime."
					}, function(err,res) {
				});	
				
			} else {
				
				return console.log(err);
			}
		});
		
 	 } else if(msg === 'forget') {
 	 	
 	 	console.log('removing user');
 	 	
 	 	User.findOne({ phone: phone }, function (err, user){
 	 		
 	 		user.remove(function (err){

				if(!err) {
					
					console.log("user removed");
					
					res.clearCookie('user');
 	 				res.send('<Response></Response>');
					
					Twilio.SMS.create({
						to: req.body.From, 
						from: smu_number, 
						body: "The information for the phone number " + phone + " is no longer saved."
						}, function(err,res) {
					});	
			
				} else {
					
					console.log("no user exists with phone number " + phone);
					
					Twilio.SMS.create({
						to: req.body.From, 
						from: smu_number, 
						body: "There is no user with the phone number " + phone + "."
						}, function(err,res) {
					});	
				}
			});
		});
	 
 	 } else {
 	 	
 	 	var signup_code = req.cookies.signup_code || msg;
 	 	
 	 	// res.cookie('signup_code', signup_code);
  		// res.send('<Response></Response>');
  		// console.log(req.cookies);
 	 	// console.log(signup_code);
 	 	 	 	 	     	 	
 	 	Event.findOne({signup_code: signup_code}, function(err, event){
 	 		
 	 		if (err) {
 	 			return console.log(err);
 	 		
 	 		} else if(!event){

				Twilio.SMS.create({
					to: req.body.From, 
					from: smu_number, 
					body: req.body.Body + " is not a valid event ID. Please check the ID and try again."
					}, function(err,res){
			   		
				});
 	 	
 	 		} else if(event){
 	 			User.findOne({ phone: phone }, function (err, user){
  		
					if(err) {
						return console.log(err);
				
					} else if(!user) {
					
			 			console.log('not a registered user');

						if( route !== 'signup') { //if not user and no signup_code cookie, eg first time through
							
				 			console.log('first time through');
				 			res.cookie('route', 'signup');
					 		res.cookie('user', {registered: false});
					 		res.cookie('signup_code', signup_code);
							res.send('<Response></Response>');
					
							Twilio.SMS.create({
								to: req.body.From, 
								from: smu_number, 
								body: "Thank you for attending " + event.title + " What email would you like to sign up with?"
								}, function(err,res){
							});
							
						} else if(route === 'signup') {
							
							console.log('second time through, registering them now...');

							var email = msg;
							
							events.signUp(email, event, function(err){
								
								if(err){
									return console.log(err);
									
									Twilio.SMS.create({
										to: req.body.From, 
										from: smu_number, 
										body: "Signup unsuccessful.  Please try again."
										}, function(err,res) {
									});
									
								} else {
									
									res.clearCookie('route');
							  		res.cookie('user', {email: email});
							  		res.clearCookie('signup_code');
							  		res.send('<Response></Response>');
									
									Twilio.SMS.create({
										to: req.body.From, 
										from: smu_number, 
										body: "Signup successful.  Thank you for attending " + event.title +
											  " Text 'save' to skip the step of sending your email next time"
										}, function(err,res) {
									});	
								}
							});
						}
					
					} else if(user) {
						
						console.log("user is already registered, with " + user.email + " signing them up for " + event.title + " now...");
	
						var email = user.email;
						
						events.signUp(email, event, function(err){
							
							Twilio.SMS.create({
								to: req.body.From, 
								from: smu_number, 
								body: "Signup successful.  Thank you for attending " + event.title
								}, function(err,res) {
							});	
						});
				  	}
				});
 	 		};
 	 	});
	 };
};