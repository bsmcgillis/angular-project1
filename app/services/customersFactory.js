//This file is using an AJAX call to the node.js server using ajax

(function() {
	var customersFactory = function ($http) {

		//Note: Customers are now housed in the node server. They can also be found in the customersService.js file

		var factory = {};
		factory.getCustomers = function () {
			return $http.get('/customers');
		};

		factory.getCustomer = function(customerId) {			
			return $http.get('/customers/' + customerId);
		};

		factory.getOrders = function() {
			return $http.get('/orders');
		};

		factory.deleteCustomer = function(customerId) {
			return $http.delete('/customers/' + customerId);
		};

		return factory;
	};

	customersFactory.$inject = ['$http'];

	angular.module('custModule').factory('customersFactory', customersFactory);

}());