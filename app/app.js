// Option 1 - give the module a global variable name
//app = angular.module('custModule', ['ngRoute']);

// Option 2 and 3 - wrap the module in an anonymous function
(function() {

	angular.module('custModule', ['ngRoute', 'ngAnimate']);

	angular.module('custModule').config(function($routeProvider) {

	$routeProvider
		.when('/', {
				controller: 'CustomersController',
				templateUrl: 'app/views/customers.html'
			})

		.when('/orders/:customerId', {
				controller: 'OrdersController',
				templateUrl: 'app/views/orders.html'
			})

		.when('/orders', {
				controller: 'AllOrdersController',
				templateUrl: 'app/views/allorders.html'
			})

		.otherwise({ redirectTo: '/' });
	});

}());

