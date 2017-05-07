console.log("Times controller");

angular.module("CastingAiApp", [])
.controller("TimesController", TimesController);

var timesList = [
	{time: "1:00PM", mTime: "13:00", fTime: "13:15"},
	{time: "1:15PM", mTime: "13:15", fTime: "13:30"},
	{time: "1:30PM", mTime: "13:30", fTime: "13:45"},
	{time: "1:45PM", mTime: "13:45", fTime: "14:00"},
	{time: "2:00PM", mTime: "14:00", fTime: "14:15"},
	{time: "2:15PM", mTime: "14:15", fTime: "14:30"},
	{time: "2:30PM", mTime: "14:30", fTime: "14:45"},
	{time: "2:45PM", mTime: "14:45", fTime: "15:00"},    
	{time: "3:00PM", mTime: "15:00", fTime: "15:15"},
	{time: "3:15PM", mTime: "15:15", fTime: "15:30"},
	{time: "3:30PM", mTime: "15:30", fTime: "15:45"},
	{time: "3:45PM", mTime: "15:45", fTime: "16:00"}
];



TimesController.$inject =['$http'];
function TimesController($http){
	var self = this;
	self.all = [];
	self.getTimes = getTimes;
	self.bookTime = bookTime;
	self.formDrop = formDrop;
	self.newForm = false;

 	//form drop function
	function formDrop(){
	   self.newForm = !self.newForm;
	 }

	getTimes();
	function getTimes(){
		self.all = timesList;
	}
	
	function bookTime(time){
		var index = self.all.indexOf(time);
		console.log(timesList[index].mTime);
		self.all.splice(index, 1);
		//ADD IN GOOGLE CALENDAR API ADD EVENT FUNCTION
		var event = {
			'summary': 'Casting Ai',
			'location': 'Your place!',
			'description': 'Great acting opportunity!',
			'start': {
				'dateTime': '2015-05-07T' + time.mTime +':00-06:00',
				'timeZone': 'America/Boulder'
			},
			'end': {
				'dateTime': '2015-05-07T'+ time.fTime +':00-06:00',
				'timeZone': 'America/Blouder'
			},
			'attendees': [
			{'email': 'lpage@example.com'}
			],
			'reminders': {
				'useDefault': false,
				'overrides': [
				{'method': 'email', 'minutes': 24 * 60},
				{'method': 'popup', 'minutes': 10}
				]
			}
		};
		var request = gapi.client.calendar.events.insert({
			'calendarId': 'o3fe9sivdnaqokfc367te542cs@group.calendar.google.com',
			'resource': event
		});
			console.log(request);
			request.execute(function(event) {
			console.log('Event created: ' + event.htmlLink);
		});
	}
}
