// *** Option 0 - Just include the module right before the controller in the same file

// var custModule = angular.module('custModule', []);
// custModule.controller('filteringController', ['$scope', function ($scope) {

// 	$scope.sortBy = 'name';
// 	$scope.reverse = 'false';

//     $scope.customers = [
//         {joined: '2000-12-02', name: 'John', city:'Chandler', orderTotal: 9.9956},
// 		{joined: '1965-01-14', name: 'Janice', city:'Scranton', orderTotal: 6.01154},
// 		{joined: '2011-03-06', name: 'Ted', city:'Phoenix', orderTotal: 4.625531}
// 	];

// 	$scope.doSort = function(propName) {
// 		$scope.sortBy = propName;
// 		$scope.reverse = !$scope.reverse;
// 	}
// }]);

// *** Option 1 - using the global variable defined in the app.js file for the module also putting this controller
// inside the square brackets after specifying the scope variable. The specifying the scope variable is done so
// if this code is ever minified, Angular will still be able to find the scope variable that it needs.

// app.controller('FilteringController', ['$scope', function ($scope) {

// 	$scope.sortBy = 'name';
// 	$scope.reverse = 'false';

//     $scope.customers = [
//         {joined: '2000-12-02', name: 'John', city:'Chandler', orderTotal: 9.9956},
// 		{joined: '1965-01-14', name: 'Janice', city:'Scranton', orderTotal: 6.01154},
// 		{joined: '2011-03-06', name: 'Ted', city:'Phoenix', orderTotal: 4.625531}
// 	];

// 	$scope.doSort = function(propName) {
// 		$scope.sortBy = propName;
// 		$scope.reverse = !$scope.reverse;
// 	};
// }]);

// *** Option 2 - Using the module defined within an anonymous function. This is itself wrapped within
// an anonymous function.

// (function() {
// 	angular.module('custModule').controller('FilteringController', ['$scope', function ($scope) {

// 		$scope.sortBy = 'name';
// 		$scope.reverse = 'false';

// 	    $scope.customers = [
// 	        {joined: '2000-12-02', name: 'John', city:'Chandler', orderTotal: 9.9956},
// 			{joined: '1965-01-14', name: 'Janice', city:'Scranton', orderTotal: 6.01154},
// 			{joined: '2011-03-06', name: 'Ted', city:'Phoenix', orderTotal: 4.625531}
// 		];

// 		$scope.doSort = function(propName) {
// 			$scope.sortBy = propName;
// 			$scope.reverse = !$scope.reverse;
// 		};
// 	}]);
// }());

// *** Option 3 - Defines the controller first and then applies it to the module.
// Uses a different setup for the parameter injection: the inject function method.

// NOTE: This setup is using the CustomersController naming instead of FilteringController.
// Also, it's much larger now

(function() {

	var CustomersController = function($scope, $log, customersFactory, appSettings) {
		$scope.sortBy = 'name';
		$scope.reverse = 'false';
		$scope.customers = [];
		$scope.appSettings = appSettings;

		function init() {
			customersFactory.getCustomers()
				.success(function(customers) {
					$scope.customers = customers;
				})
				.error(function(data, status, headers, config) {
					$log.log(data.error + ' ' + status);
				});


			// Below is the old call to the service without ajax
			// $scope.customers = customersService.getCustomers();
		}

		init();

		$scope.doSort = function(propName) {
			$scope.sortBy = propName;
			$scope.reverse = !$scope.reverse;
		};	

		$scope.deleteCustomer = function(customerId) {
			customersFactory.deleteCustomer(customerId)
				.success(function(status) {
					if (status) {
						for (var i = 0, len = $scope.customers.length; i < len; i++)  {
							if ($scope.customers[i].id === customerId) {
								$scope.customers.splice(i, 1);
								break;
							}

						}
					}
					else {
						$window.alert('Unable to delete customer');
					}
				})
				.error(function(data, status, headers, config) {
					$log.log(data.error + ' ' + status);
				});
		};
	};

	CustomersController.$inject = ['$scope', '$log', 'customersFactory', 'appSettings'];

	angular.module('custModule').controller('CustomersController', CustomersController);

}());



