flowerApp.controller('mainCtrl', ['storageService', function(storageService){

    var vm = this;

    vm.flowersCollection = storageService.getFlowersCollection() || [];

    vm.addFlower = function(){
        
        // we calculate how many milliseconds we have before our flower dies
        var waterMilliSeconds = vm.newFlower.waterDays * 86400000 + vm.newFlower.waterHours * 3600000 + vm.newFlower.waterMinutes * 60000;
        var flower = {
            created:           new Date(),
            flowerName:        vm.newFlower.flowerName,
            waterMilliSeconds: waterMilliSeconds,
            lastWatered:       new Date().getTime(),
            waterDeadline:     new Date().getTime() + waterMilliSeconds,
            dead:              false
        };

        vm.newFlower = undefined;
        vm.flowersCollection.push(flower);
        storageService.setFlowersCollection(vm.flowersCollection);
    };

    vm.waterFlower = function(created){
        vm.flowersCollection.forEach(function(el){
            if(el.created == created){
                el.lastWatered = new Date().getTime();
                el.waterDeadline = (new Date().getTime() + el.waterMilliSeconds);
            }
        });
        storageService.setFlowersCollection(vm.flowersCollection);
    };

    vm.deleteOneFlower = function(created){
        vm.flowersCollection.forEach(function(el, index){
            if(el.created == created){
                vm.flowersCollection.splice(index, 1);
            }
            storageService.setFlowersCollection(vm.flowersCollection);
        });
    };

    // a method to see if our flower hasn't been watered for too long and ONLY 1 minute left before it dies
    vm.lastWatered = function(flower){
        return(flower.waterDeadline - new Date().getTime() <= 60000 && flower.waterDeadline - new Date().getTime() > 0);
    };

    // a flag method to see if one or more flowers are about to die. It is used to trigger our alert notification.
    vm.warning = function(){
        var isAboutToExpire = false;
        vm.flowersCollection.forEach(function(el, index){
            if(vm.lastWatered(el)) isAboutToExpire = true;
        });
        return isAboutToExpire;
    };

    return this;
}]);