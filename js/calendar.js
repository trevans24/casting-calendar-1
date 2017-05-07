'use strict'
const client_id = "1086657930486-mm9fggoimnv8lo08hu3jmbdh4gfg1gkp";
let discovery_docs = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
// authorized scopes required by API
let scopes = 'https://www.googleapis.com/auth/calendar.readonly';
var authorized = $('#authorized');
console.log(authorized + "AUHTOS");
var signOut = $("#signout");
console.log(signOut + "THIS");
// On load function
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
    console.log("Authorizing Client");
    // console.log(initClient);
    // console.log(signOut);
}
// sing in user
function handleAuthClick(e){
    gapi.auth2.getAuthInstance().signIn();
}
// sign out user
function handlsSignoutClick(e){
    gapi.auth2.getAuthInstance().signOut();
}
// initializing client and set up of sign in state
function initClient() {
    gapi.client.init({
        discoveryDocs: discovery_docs,
        clientId: client_id,
        scope: scopes
    })
    .then(()=>{
        console.log("client", gapi.client);
        console.log(gapi);
        console.log(gapi.auth2);
        // listening for sign in state changes
        gapi.auth2.getAuthInstance()
            .isSignedIn.listen(updateSigninStatus);
            // handeling initial sign in
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            authorized.on('click', function handleAuthClick(e){
              console.log("Clicked");
                e.preventDefault();
                gapi.auth2.getAuthInstance().signIn();
            });
            signOut.on('click', function handlsSignoutClick(e){
                e.preventDefault();
                gapi.auth2.getAuthInstance().signOut();
            });
    });
}
// called when sign in status changes, update properly
// after sign in call to API
function updateSigninStatus(isSignedIn){
    if (isSignedIn) {
        authorized.css.display = 'none';
        signOut.css.display = 'block';
        listUpcomingEvents();
    }
        authorized.css.display = 'block';
        signOut.css.display = 'none';
}
// adding body of message to pre element in html
function appendPre(message){
    let pre = document.querySelector('#content');
    let textContent = document.createTextNode(message + '\n');
    // console.log("message", message);
    // console.log("textContent", textContent);
    // console.log(typeOf(textContent));
    // pre.appendChild(textContent);
}
// print date and time of next 10 events
function listUpcomingEvents() {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 5,
          'orderBy': 'startTime'
        }).then(function(response) {
          let events = response.result.items;
          // appendPre('Upcoming events:');
          if (events.length > 0) {
            for ( let i = 0; i < events.length; i++) {
              let event = events[i];
              let when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              // appendPre(event.summary + ' (' + when + ')');
            }
          } else {
            // appendPre('No upcoming events found.');
          }
        });
      }