flowerApp.directive('countdown', ['$interval', function ($interval) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                function intFun() {
                    var future = new Date(+scope.flower.waterDeadline);
                    var diff;
                    diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                    function formattedDate(){
                        var d = Math.floor(diff / 86400);
                        var h = Math.floor(diff / 3600) % 24;
                        var m = Math.floor(diff / 60) % 60;
                        var s = diff % 60;
                        return d + "d:" + h + "h:" + m + "m:" + s + "s";
                    }
                    if(diff <= 0){
                        stopTimer();
                        element.text('X__X');
                        scope.flower.dead = true;
                        console.log(scope.flower)
                    }else{
                        element.text(formattedDate());
                    }
                }
                intFun();
                var int = $interval(intFun, 1000);

                function stopTimer() {
                    if (angular.isDefined(int)) {
                        $interval.cancel(int);
                        int = undefined;
                    }
                };
            }
        };
    }
]);