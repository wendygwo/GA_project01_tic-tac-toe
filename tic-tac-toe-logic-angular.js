

var ticTacToeGame=angular.module('ticTacToeGame', []);

ticTacToeGame.controller('ticTacToeGameCtrl', function($scope){

	//initialize board to empty strings
	$scope.board=['','','','','','','','','']

	$scope.turnNumber = 0;

	$scope.imgSource='';
	// $scope.path='images/starfish1.png';

	$scope.winningPlayer = '';
	$scope.winningCombinations = [['1','2','3'],['4','5','6'],['7','8','9'],['1','4','7'],['2','5','8'],['3','6','9'],['1','5','9'],['3','5','7']];

	//Function to put X or O into the squares
	$scope.makeMove=function(idx){
		if (($scope.board[idx]!='x') && ($scope.board[idx]!='o')){ //This lines checks to see if the board piece has already been taken
			if ($scope.turnNumber%2==0){
				$scope.board[idx]='x';
				
				$scope.imgSource = 'images/starfish1.png'; //****This part doesn't seem to have any effect. I'd like to put actual image in, rather than use background image
			} else {
				$scope.board[idx]='o';
				
				$scope.imgSource = 'images/seashell1_edited.png';//****This part doesn't seem to have any effect. I'd like to put actual image in, rather than use background image
			}
			$scope.turnNumber++; //increment turn number
		}

		//goes in here if there have been at least 5 turns, meaning there can be a winner
		// if($scope.turnNumber>=4){
		// 	$scope.winningPlayer='';

		// 	if($scope.turnNumber%2==0){

		// 	} else{


		// 	}
		// }
	};


}); //End makeMove function