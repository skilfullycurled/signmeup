//var signmeup = require('../controllers/signmeup.js');
var events = require('../controllers/events.js');
var sms = require('../controllers/sms.js');
var users = require('../controllers/users.js');

//LIST ALL EVENTS ON MAIN PAGE
app.get('/signmeup', events.listAll);

//CREATE AN EVENT
app.get('/signmeup/events/create', events.submit);
app.post('/signmeup/events/create', events.create);

//LIST THE ATTENDEES FROM AN EVENT
app.get('/signmeup/events/attendees/:signup_code', events.attendees);

//LIST ALL EVENTS
app.get('/signmeup/events', events.listAll);

//LIST A SINGLE EVENT
app.get('/signmeup/events/:signup_code', events.listOne);

//SMS ROUTER
app.post('/signmeup/sms', sms.router);