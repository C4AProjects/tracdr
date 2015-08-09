/**
 * Project: tracdr
 * Created by Haythem Horbit on 02/08/15.
 */
trackDr.directive('date', function () {
    return {
        templateUrl: 'date.html',
        restrict: 'E',
        replace: true,
        require: '?ngModel',
        link: function postLink(scope, element, attrs, ctrl) {
            if (!ctrl) {
                return;
            }

            var dateInput = element.find('select').eq(0);
            var monthInput = element.find('select').eq(1);
            var yearInput = element.find('input');

            ctrl.$render = function() {
                dateInput.val(ctrl.$viewValue ? ctrl.$viewValue.getDate() : '1');
                monthInput.val(ctrl.$viewValue ? ctrl.$viewValue.getMonth() + 1 : '1');
                yearInput.val(ctrl.$viewValue ? ctrl.$viewValue.getFullYear() : '2014' );
            };

            function updateViewValue() {
                var value = new Date(yearInput.val(), monthInput.val() - 1, dateInput.val());
                scope.$apply(function() {
                    ctrl.$setViewValue(value);
                });
            }

            dateInput.on('change', updateViewValue);
            monthInput.on('change', updateViewValue);
            yearInput.on('input', updateViewValue);
        }
    };})