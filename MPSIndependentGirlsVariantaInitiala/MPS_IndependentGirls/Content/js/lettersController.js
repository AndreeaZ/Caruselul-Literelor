'use strict';

angular.module('myApp', []).controller('letters', function($scope, $http) {

    $scope.details = {};
    $scope.inputVisible = false;
    $scope.tableVisible = false;
    $scope.finishMessageHappy = false;
    $scope.finishMessageSad = false;
    $scope.letters = ['A', 'A', 'A', 'A', 'A', 'B','C','C','D', 'E', 'E', 'E', 'E', 'E', 'E','F','F', 'G', 'H', 'H', 'H', 'I', 'I', 'I', 'J', 'K', 'L', 'M', 'M', 'M', 'N', 'N', 'N', 'O', 'O', 'O', 'O', 'P', 'Q', 'R', 'R', 'S', 'S','T', 'T', 'T', 'T', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; // cele 54 de litere
    $scope.words = []; // cuv introduse de jucator
    $scope.inputString = "";

    

    $scope.startWithRandom9Letters = function () {
        $scope.nineLetters = [];
        $scope.finishMessageHappy = false;
        $scope.finishMessageSad = false;
        $scope.inputString = "";

        for (var i = 0; i < 9; i++) {
            var randomIndex = Math.round(Math.random() * 53);
            $scope.nineLetters.push($scope.letters[randomIndex]);
        }

        $scope.tableVisible = true;
        $scope.inputVisible = true;
       
    }

    $scope.checkWords = function () {
        $scope.score = 0;
        $scope.words = $scope.inputString.split(', ');
        $scope.tableVisible = false;
        $scope.inputVisible = false;



        function httpGet(theUrl) {
            var xmlHttp = null;

            xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, false);
            xmlHttp.send(null);
            return xmlHttp;
        }

        for (var index=0; index < $scope.words.length; index ++) {
            var response = httpGet("https://dexonline.ro/definitie/" + $scope.words[index]);
            var string = response.responseText;
            if (response.status == 404 || response.readyState != 4)
                $scope.finishMessageSad = true;
            else if (response.readyState == 4 && response.status == 200)
                $scope.finishMessageHappy = true;
        }
       
                     
        

        
            //$scope.finishMessageHappy = false;  // if score > x -> happy ; else Sad
           
       

        
      

    }

});