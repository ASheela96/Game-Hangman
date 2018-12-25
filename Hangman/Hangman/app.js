var app = angular.module("HangmanApp", []);
app.controller("GameController", ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.demo = "something"

    var words = ["rat", "cat", "bat", "mat"];
    $scope.incorrectLettersChosen = [];
    $scope.correctLettersChosen = [];
    $scope.guesses = 6;
    $scope.displayWord = '';
    $scope.input = {
        letter: ''
    }


    //function to get a random word from array
    var selectRandomWord = function () {
        var index = Math.round(Math.random() * words.length);
        return words[index];
    }

    //function game will start from scratch
    var newGame = function () {
        $scope.incorrectLettersChosen = [];
        $scope.correctLettersChosen = [];
        $scope.guesses = 6;
        $scope.displayWord = '';

        selectWord = selectRandomWord();
        console.log(selectWord);

        var tempDisplayWord = '';
        for (var i = 0; i < selectWord.length; i++) {
            tempDisplayWord += '*';
        }

        $scope.displayWord = tempDisplayWord;
    }

    //whenever user type char, will be compared
    $scope.letterChosen = function () {
        for (var i = 0; i < $scope.correctLettersChosen.length; i++) {
            if ($scope.correctLettersChosen[i].toUpperCase() == $scope.input.letter.toUpperCase()) {
                $scope.input.letter = "";
                return;
            }
        }

        //for incorrect
        for (var i = 0; i < $scope.incorrectLettersChosen.length; i++) {
            if ($scope.incorrectLettersChosen[i].toUpperCase() == $scope.input.letter.toUpperCase()) {
                $scope.input.letter = "";
                return;
            }
        }

        //if user guessed correctly
        var correct = false;

        for (var i = 0; i < selectWord.length; i++) {
            if (selectWord[i].toUpperCase() == $scope.input.letter.toUpperCase()) {
                $scope.displayWord = $scope.displayWord.slice(0, i) + $scope.input.letter.toUpperCase() + $scope.displayWord.slice(i + 1);
                correct = true;
            }
        }

        if (correct) {
            $scope.correctLettersChosen.push($scope.input.letter.toUpperCase());
        }
        else {
            $scope.guesses--;
            $scope.incorrectLettersChosen.push($scope.input.letter.toUpperCase());
        }

        $scope.input.letter = "";
        if ($scope.guesses == 0) {
            alert("you lost!");
            $timeout(function () {
                newGame();
            }, 500);
        }
        if ($scope.displayWord.indexOf("*") == -1) {
            alert("you won!");
            $timeout(function () {
                newGame();
            }, 500);
        }
    }
    newGame();
}])