angular.module('form', ['ui.bootstrap', 'ui.bootstrap.datetimepicker']);

angular.module('form').controller('FormController',
    /**
     * Настройки таймпикера
     */
    function ($scope, $timeout) {

        $scope.dateTimeNow = function() {
            $scope.date = new Date();
        };
        $scope.dateTimeNow();

        $scope.toggleMinDate = function() {
            var minDate = new Date();
            // set to yesterday
            minDate.setDate(minDate.getDate() - 1);
            $scope.minDate = $scope.minDate ? null : minDate;
        };

        $scope.toggleMinDate();

        $scope.dateOptions = {
            showWeeks: false
        };

        // Disable weekend selection
        $scope.disabled = function(calendarDate, mode) {
            return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
        };

        $scope.open = function($event,opened) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.dateOpened = true;
            console.log('opened');
        };

        $scope.dateOpened = false;
        $scope.hourStep = 1;
        $scope.format = "MMMM dd, yyyy";
        $scope.minuteStep = 15;

        $scope.timeOptions = {
            hourStep: [1, 2, 3],
            minuteStep: [1, 5, 10, 15, 25, 30]
        };

        $scope.showMeridian = true;
        $scope.timeToggleMode = function() {
            $scope.showMeridian = !$scope.showMeridian;
        };

        $scope.$watch("date", function(date) {
        }, true);

        $scope.resetHours = function() {
            $scope.date.setHours(1);
        };

        var user = $scope.user = {
            name: '',
            location: '',
            date: new Date(),
            choices:
                [
                    {value:'', label: true},
                    {value:''},
                    {value:'', add: true}
                ]
        };

        /**
         * Добавляет экземпляр Choice в массив Choices объекта user. Отвечает за логику отбражения конопки Add another choice
         */
        $scope.addChoice = function() {
            var choices = user.choices;
            for (var i = 0; i < choices.length; i++){
                if(choices[i].add) delete choices[i].add;
                choices[i].mod = 'col-md-offset-3';
            }
            user.choices.push({value:'', add: true});
        };

        /**
         * Удаляет экземпляр Choice из массива Choices объекта user. Отвечает за логику отбражения конопки Add another choice
         * @param  {object} choice - Экземпляр объекта Choice.
         */
        $scope.removeChoice = function(choice) {
            for (var i = 0, ii = user.choices.length; i < ii; i++) {
                if (choice === user.choices[i]) {
                    if(i == ii - 1){
                        $scope.user.choices[i-1].add = true;
                    }

                    $scope.user.choices.splice(i, 1);

                }
            }
        };

    });

