'use strict';

angular.module('myApp', []).controller('letters', function ($scope, $timeout) {

    $scope.nineLetters = [];
    $scope.nineLettersLower = [];
    $scope.details = {};
    $scope.inputVisible = false;
    $scope.tableVisible = false;
    $scope.finishMessageHappy = false;
    $scope.finishMessageSad = false;
    //$scope.letters = ['A', 'A', 'A', 'A', 'A', 'B','C','C','D', 'E', 'E', 'E', 'E', 'E', 'E','F','F', 'G', 'H', 'H', 'H', 'I', 'I', 'I', 'J', 'K', 'L', 'M', 'M', 'M', 'N', 'N', 'N', 'O', 'O', 'O', 'O', 'P', 'Q', 'R', 'R', 'S', 'S','T', 'T', 'T', 'T', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; // cele 54 de litere
    $scope.dice = {};
    $scope.dice[1] = ['A', 'A', 'U', 'I', 'H', 'J'];
    $scope.dice[2] = ['T', 'R', 'N', 'S', 'M', 'B'];
    $scope.dice[3] = ['A', 'A', 'R', 'C', 'D', 'M'];
    $scope.dice[4] = ['E', 'E', 'I', 'O', 'D', 'F'];
    $scope.dice[5] = ['A', 'E', 'U', 'S', 'F', 'V'];
    $scope.dice[6] = ['T', 'L', 'N', 'P', 'G', 'C'];
    $scope.dice[7] = ['A', 'I', 'O', 'E', 'X', 'Z'];
    $scope.dice[8] = ['N', 'S', 'T', 'R', 'G', 'B'];
    $scope.dice[9] = ['I', 'I', 'U', 'E', 'L', 'P'];
    $scope.words = []; // cuv introduse de jucator
    $scope.inputString = "";
    $scope.visibleTimer = false;

    $scope.myTimer = 180;
    $scope.mins = '03';
    $scope.secs = '00';
    var id = 0;
   

    $scope.startWithRandom9Letters = function () {
        clearInterval(id);
        $scope.visibleTimer = true;
        $scope.myTimer = 180;
        $scope.mins = '03';
        $scope.secs = '00';
        $scope.nineLetters = [];
        $scope.finishMessageHappy = false;
        $scope.finishMessageSad = false;
        $scope.inputString = "";

        for (var i = 0; i < 9; i++) {
            var randomIndex = Math.round(Math.random() * 5);
            $scope.nineLetters.push($scope.dice[i+1][randomIndex]);
            $scope.nineLettersLower.push($scope.dice[i+1][randomIndex].toLowerCase());
        }

        $scope.tableVisible = true;
        $scope.inputVisible = true;

        $scope.updateTimer = function () {
            $scope.myTimer--;
            var mins = Math.floor($scope.myTimer / 60);
            var secs = $scope.myTimer % 60;
            if (mins < 10) {
                $scope.mins = '0' + mins;
            }
            else {
                $scope.mins = mins;
            }
            if (secs < 10) {
                $scope.secs = '0' + secs;
            }
            else {
                $scope.secs = secs;
            }

            if ($scope.myTimer == 0) {
                
                    angular.element(document.querySelector('#verify')).triggerHandler('click');
                    clearInterval(id);
                
            }
            $scope.$apply();
        }
        id = setInterval($scope.updateTimer, 1000);
        
    }

   
    $scope.checkWords = function () {
        
        $scope.score = 0;
        $scope.nrWords = 0;
        $scope.words = $scope.inputString.split(', ');
        $scope.tableVisible = false;
        $scope.inputVisible = false;

        clearInterval(id);



        function httpGet(theUrl) {
            var xmlHttp = null;

            xmlHttp = new XMLHttpRequest();
            
            try {
                xmlHttp.open("GET", theUrl, false);
                xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*');
                xmlHttp.setRequestHeader('Access-Control-Allow-Method', 'GET');
                xmlHttp.setRequestHeader('Access-Control-Allow-Header', 'Content-Type');
                xmlHttp.send(null);
                return xmlHttp;
            } catch( Exception ) {
                return null;
            }
           
        }

        for (var index=0; index < $scope.words.length; index ++) {
            var currentWord = $scope.words[index];
            var response = httpGet("https://dexonline.ro/definitie/" + currentWord);
            
            if (response != null && response.readyState == 4 && response.status == 200) {
                var ok = true;
                var okNumbersOfLetters = true;
                
                for (var i = 0; i < currentWord.length; i++) {
                        if (currentWord.charAt(i) == 'ă' || currentWord.charAt(i) == 'â')
                            currentWord = currentWord.substring(0, i) + 'a' + currentWord.substring(i + 1);
                        else if (currentWord.charAt(i) == 'î')
                            currentWord = currentWord.substring(0, i) + 'i' + currentWord.substring(i + 1);
                        else if (currentWord.charAt(i) == 'ș')
                            currentWord = currentWord.substring(0, i) + 's' + currentWord.substring(i + 1);
                        else if (currentWord.charAt(i) == 'ț')
                            currentWord = currentWord.substring(0, i) + 't' + currentWord.substring(i + 1);
                           
                }

                for (var i = 0; i < currentWord.length; i++) {
                      
                    if ($scope.nineLettersLower.indexOf(currentWord.charAt(i)) == -1) {
                        ok = false;
                        break;
                    }
                            
                        
                    for (var occurencesOfCharInString = -1, indexx = -2; indexx != -1; occurencesOfCharInString++, indexx = currentWord.indexOf(currentWord.charAt(i), indexx + 1));

                        
                    var occurencesOfStringInArray = jQuery.grep($scope.nineLettersLower, function (j) { return j == currentWord.charAt(i); }).length;

                    if (occurencesOfCharInString > occurencesOfStringInArray) {
                        okNumbersOfLetters = false;
                        break;
                    }
                           
                }
               

                if (ok == true && currentWord.length > 3 && okNumbersOfLetters == true) {  //cuvantul are literele acceptate
                    $scope.nrWords++;
                    $scope.score += currentWord.length;
                }
            }
                
        }

        if ($scope.score > 4)
            $scope.finishMessageHappy = true;
        else
            $scope.finishMessageSad = true;
       
                     
        $scope.nineLetters = [];
        $scope.nineLettersLower = [];

        //location.reload();
        

    }

    

});