const client_id = "1086657930486-mm9fggoimnv8lo08hu3jmbdh4gfg1gkp";

let discovery_docs = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
// authorized scopes required by API
let scopes = 'https://www.googleapis.com/auth/calendar.readonly';
// On load function
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
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
        gapi.auth2.getAuthInstance()
            .isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            $('#authorized').on('click', function handleAuthClick(e){
              console.log("Clicked authorized");
                e.preventDefault();
                gapi.auth2.getAuthInstance().signIn();
            });
            $('#signout').on('click', function handlsSignoutClick(e){
              console.log("Clicked sign out");
                e.preventDefault();
                gapi.auth2.getAuthInstance().signOut();
            });
    });
}
// called when sign in status changes, update properly
// after sign in call to API
function updateSigninStatus(isSignedIn){
    if (isSignedIn) {
        console.log("isSignedIn", isSignedIn);
    }
}
