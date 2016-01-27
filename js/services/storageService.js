flowerApp.service('storageService', [function () {

    this.addOneFlower = function(flower) {
        var flowersCollection = this.getFlowersCollection() || [];
        flowersCollection.push(flower);
        localStorage.flowersCollection = angular.toJson(flowersCollection);
    };

    this.updateOneFlower = function(flower) {
        var flowersCollection = this.getFlowersCollection();
        var updatedFlowersCollection = flowersCollection.map(function(el){
            var newObj = {};
            if(el.created == flower.created){
                newObj = flower;
            }else{
                newObj = el;
            }
            return newObj;
        });
        localStorage.flowersCollection = angular.toJson(updatedFlowersCollection);
    };

    this.deleteOneFlower = function(flowerCreated) {
        var flowersCollection = this.getFlowersCollection();
        var updatedFlowersCollection = [];
        flowersCollection.forEach(function(el){
            if(el.created != flowerCreated){
                updatedFlowersCollection.push(el);
            }
        });
        localStorage.flowersCollection = angular.toJson(updatedFlowersCollection);
    };

    this.getFlowersCollection = function() {
        if(localStorage.flowersCollection !== "undefined") {
            return angular.fromJson(localStorage.flowersCollection);
        }
    };


}]);