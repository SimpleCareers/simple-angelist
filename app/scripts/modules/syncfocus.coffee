angular.module("syncFocusWith", []).directive "syncFocusWith", ($timeout, $rootScope) ->
  restrict: "A"
  scope:
    focusValue: "=syncFocusWith"

  link: ($scope, $element, attrs) ->
    $scope.$watch "focusValue", (currentValue, previousValue) ->
      if currentValue is true and not previousValue
        $element[0].focus()
      else $element[0].blur()  if currentValue is false and previousValue
      return

    return
