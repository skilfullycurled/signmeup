var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var User = new Schema({
	
	phone: String,
	email: String
	//events: [String] the events the person has registered for in the past
});

User.static('validateUser', function(phone) {
	
	this.findOne({ phone: phone }, function (err, user) {
  		
  		if (err) {
  			return console.log(err);  
  				
  		} else if(!event) {
  			
  			console.log('not a registered user');	
  			return false;
  				
  		} else if(event) {
  			
  			console.log('valid user');
  			return true;
  		}
	});
});

module.exports = mongoose.model('User', User);

