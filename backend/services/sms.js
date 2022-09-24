// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token in Account Info
// and set the environment variables. See http://twil.io/secure
// const twilio = require('twilio');
require('dotenv').config();

const accountSid = 'AC362e4a8c323c18f987bfd6a5476f85a5';
const authToken = '311655a839f16b44cd95c8a289ad9b82';
const client = require('twilio')(accountSid, authToken);

// console.log(client)

client.messages 
.create({
    body: 'This is the ship that made the (414)775-0692',
    from: '(414)775-0692',
    to: '+33781101937'
})
.then(message => console.log(message.sid))
.catch(err => conslole.log("Error" , err))