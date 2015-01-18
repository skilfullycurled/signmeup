[[./signmeup/public/signmeup-iphone.png]]

# Signmeup
### Paperless event signup built with Express, Mongoose, Handlbars and Twilio.

A while back I was a part of a short lived meet up called "Hacks for Hacktivists".  The idea behind this group was to create applications (software or hardware) that would ease certain friction poitns in the activist/community organizing process.  The idea behind this group came from my good friend, colleague, and co-founder of CivicLab, Tom Tresser.  

Tom is a long time Chicago community organizer whose main interests are in the protection of public goods from private interests.  Part of his model of organizing (built upon Saul Olinsky's model) is to gather grassroots support by visiting people all accross the city.  In his latest project, The TIF Illumination Project, Tom has presented in front of over 4000 people.  And, don't forget, this isn't the first time he's done this before.  Naturally, since community organizing is abou creating a community to press for change, Tom spends a lot of his time entering the names of those who sign-in to the presentations he gives.  Additionally, he often asks people to mark down whether or not they'd be interested in Along the way, Tom conceived of an idea for an application that would allow people to sign up via text.  Given the number of people organizing in this city, he also felt that there would be a large number who were suffering from the same problem.  Enter Signmeup.

This application is a proof of concept. Here's how it works:

1. The group/person (the "organization") collecting the sign-in's, goes to the URL /events/create/ and registers their event and as well as an event code.
2. The organization posts the code up all around their event along with the Twillio number.
3. At the event, users text the event code
4. If they 

###To-do's:

- **Security** - This app has no security measures whatsoever, and in today's surveilance climate, the app is completely useless unless this can be addressed.  The very nature of the application requires users to be sending phone numbers and emails.  Securing this information presents two significant challenges.  First, the general security of the database.  Second, defense against any eavesdropping while the messages are in transit.

- **Organization/User registration and log in** - Organizations will want a profile so they can keep track of events and don't have to re-enter data all the time.  User's so they can manage their notification features and data permissions.

- **Payment integration** - Twillio is not free.  Should this be developed into an application for public use (not a standalone library) inevitabilty you'll need to have people pay for it.  This could be as simple as a link guiding someone to a paypal/bitcoin system, afterwhich they obtain a confirmation link.

- **A better system of routing and flow control** - right now the application relies heavily on the cookie that Twillio provides.  There may not be another option since that's the only place you can manage state from.  That is, to my knowledge, there's no way to have URL such as /the/route/:youwant.  This has lead to a callback hell within a single route.  Surely there's a better way.

- **Event lists** - As long as organizations are entereing there events, we might as well have a *very simple* listing of all events registere.  Users could then download the event via calendar protocal, or signup for reminders, etc.

- **Organization lists** - In the same vein as the above, there might as well be a *very simple* list of the organizations that have events rigistered whcould would allow people to sign up for their notifications.

- **Event data** - More information coleection about the event beyond the title, date, time, description, perhaps.

- **List download** - The ability for the organization to download the list after the event.

- **Tests** - this code does not have any unit tests nor has it been tested in the field in groups over 10 people.

###Future directions

At one time, it seemed like a good idea to leverage the fact that we'd also have data about events, users, and organizations into an events calendar, along with some analytics.  Larger features such as this, and perhaps even this very app have been implemented in programs such as Nation Builder.  As such, I'm not sure this application is worth developmenent except as a library made for an open source alternative to Nation Builder.  Or, as a stand alone app for those who want this function and nothing more.  

Also, while cell phones and smart phones have been vastly adopted, not everyone will have one, nor be inclined to use theirs, so you'll have to have a backup system.  You could create a local network and bring your own cell phones which would be an interesting project, too.  This brings up another drawbrack which is that passing around a sign-in sheet comes with a cultural expectation that you will sign-up.  Allowing people to use their own cell phones give them the anonymity to not sign-up.  Personally, that's what I would do.