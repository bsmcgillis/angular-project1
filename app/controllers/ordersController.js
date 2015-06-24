(function() {

	var OrdersController = function($scope, $routeParams, customersFactory) {

		var customerId = $routeParams.customerId;
		$scope.customer = null;

		function init() {

			customersFactory.getCustomer(customerId)
				.success(function(customer) {
					$scope.customer = customer;
				})
				.error(function(data, status, headers, config) {
					console.log(data);
				});

			// Below is the old call without ajax
			// $scope.customer = customersFactory.getCustomer(customerId);
		}

		init();
	};

	OrdersController.$inject = ['$scope', '$routeParams', 'customersFactory'];

	angular.module('custModule').controller('OrdersController', OrdersController);

}());