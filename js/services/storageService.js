flowerApp.service('storageService', [function () {

    this.getFlowersCollection = function() {
        if(localStorage.flowersCollection !== "undefined") {
            return angular.fromJson(localStorage.flowersCollection);
        }
    };

    this.setFlowersCollection = function(flowersCollection) {
        localStorage.flowersCollection = angular.toJson(flowersCollection);
    };
}]);