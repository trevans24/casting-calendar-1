console.log("Times controller");

var app = angular.module("CastingAiApp", ['ngRoute'])
.controller("BookedTimesController", BookedTimesController)
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

var bookedTimes = [];
////////////
// ROUTES //
////////////
app.config(function($routeProvider, $locationProvider){
  $routeProvider
  	.when('/', {
  		templateUrl: '../templates/calendar.html'
  	})
    .when('/appts', {
      templateUrl: '../templates/times-index.html',
      controller: 'TimesController'
    })
    .when('/booked', {
      templateUrl: '../templates/times-show.html',
      controller: 'BookedTimesController'
    });
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});
/////////////////
// CONTROLLERS //
/////////////////
function BookedTimesController(){
	console.log("BOOKED");
	var self = this;
	self.all = bookedTimes;
}

function TimesController(){
	// console.log("TIMES");
	var self = this;
	self.all = [];
	self.getTimes = getTimes;
	self.bookTime = bookTime;
	self.removeTime = removeTime;
	self.newForm = false;

	getTimes();
	function getTimes(){
		self.all = timesList;
	}
	
	function bookTime(time){
		var index = self.all.indexOf(time);
		bookedTimes.push(timesList[index]);
		self.all.splice(index, 1);
		// console.log("booked: " + index);
	}

	function removeTime(time){
		var index = self.all.indexOf(time);
		self.all.splice(index, 1);
		console.log("removed");
	}
}