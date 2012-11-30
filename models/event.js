var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var Event = new Schema({
	
	posted: { type: Date, default: Date.now },

	title: String,
	
	venue: {
    	name: String,
    	location: String
    },
	
	begins: String,
	ends: String,
	
	desc: String,
	details: String,
	
	ward: String, 
	hood: String, 
	issues: String,
	
	signup_code: String,
	attendees: [String]
	
	//ADDITIONS?
	//make issues an a String array
	//signup list
	//hashtag
	//status - open or closed
	//add "required"
	//add validations
	//perhaps in the future, attendees is a list of the users with email and ID not just a list of emails?
});

Event.static('validateEventCode', function(signup_code) {
	
	this.findOne({ signup_code: signup_code }, function (err, event) {
  		
  		if (err) {
  			return console.log(err);  
  				
  		} else if(!event) {
  			
  			console.log('not a registered event');	
  			return false;
  				
  		} else if(event) {
  			
  			console.log('valid event');
  			return event;
  		}
	});
});

module.exports = mongoose.model('Event', Event);