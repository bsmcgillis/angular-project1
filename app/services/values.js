//Can only be inject at the controller level or below
angular.module('custModule').value('appSettings', {
	title: 'Customers Application',
	version: '1.0'
});

//Can be injected at the module level
/*
angular.module('custModule').constant('appSettings', {
	title: 'Customers Application',
	version: '1.0'
});
*/

