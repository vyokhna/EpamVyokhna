flowerApp.controller('mainCtrl', ['storageService', function(storageService){

    var vm = this;

    vm.flowersCollection = storageService.getFlowersCollection() || [];

    vm.addFlower = function(){
        var waterMilliSeconds = vm.newFlower.waterDays*86400000 + vm.newFlower.waterHours*3600000 + vm.newFlower.waterMinutes*60000;
        var flower = {
            created: new Date(),
            flowerName: vm.newFlower.flowerName,
            waterMilliSeconds: waterMilliSeconds,
            lastWatered: new Date().getTime(),
            waterDeadline: (new Date().getTime() + waterMilliSeconds),
            fiveMinuteWarning: function(){
                return (new Date().getTime() - (this.lastWatered + this.waterMilliSeconds) <= 300000)
            },
            dead: false
        };
        vm.newFlower = undefined;
        vm.flowersCollection.push(flower);
        storageService.addOneFlower(flower);
    };

    vm.waterFlower = function(created){
        vm.flowersCollection.forEach(function(el){
            if(el.created == created){
                el.lastWatered = new Date().getTime();
                el.waterDeadline = (new Date().getTime() + el.waterMilliSeconds);
                storageService.updateOneFlower(el);
            }
        });
    };

    vm.deleteOneFlower = function(created){
        vm.flowersCollection.forEach(function(el, index){
            if(el.created == created){
                vm.flowersCollection.splice(index, 1);
                storageService.deleteOneFlower(created);
            }
        });
    };


    console.log(vm.flowersCollection);
    return this;


}]);