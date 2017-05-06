angular.module('calendarApp', ["ui.router", "firebase", "ui.calendar"])
	.controller('fireController', fireController);

fireController.$inject = ['$scope', '$firebaseObject'];

function fireController($scope, $firebaseObject){
	let ref = firebase.database().ref();
	$scope.data = $firebaseObject(ref);
}
