

var ticTacToeGame=angular.module('ticTacToeGame', ['firebase']);

ticTacToeGame.controller('ticTacToeGameCtrl', function($scope, $firebase){
	//Connect to firebase
	var ref = new Firebase('https://wendytictactoe.firebaseio.com/')
	// create an AngularFire reference to the data
    var sync = $firebase(ref);
    // // download the data into a local object
    $scope.board = sync.$asArray();

	//initialize board to empty strings
	$scope.board=[{val:'',playerPieceImage:''},
					{val:'',playerPieceImage:''},
					{val:'',playerPieceImage:''},
					{val:'',playerPieceImage:''},
					{val:'',playerPieceImage:''},
					{val:'',playerPieceImage:''},
					{val:'',playerPieceImage:''},
					{val:'',playerPieceImage:''},
					{val:'',playerPieceImage:''}];

	// $scope.board.$add([{val:'',playerPieceImage:''},
	// 				{val:'',playerPieceImage:''},
	// 				{val:'',playerPieceImage:''},
	// 				{val:'',playerPieceImage:''},
	// 				{val:'',playerPieceImage:''},
	// 				{val:'',playerPieceImage:''},
	// 				{val:'',playerPieceImage:''},
	// 				{val:'',playerPieceImage:''},
	// 				{val:'',playerPieceImage:''}]);
	//console.log($scope.board["-JgniLPAqnegCBpHT4TO"])
	$scope.turnNumber = 0;

	//holds image location for each piece. location of image set after a piece has been clicked on
	$scope.imgSource='';

	$scope.xMoves=[];
	$scope.oMoves=[];
	$scope.winningPlayer = '';//Set to name of winning player
	$scope.someoneWon = false; //set to true when someone wins
	$scope.catsGame=false;//set to true if it's a cat's game

	$scope.winningCombinations = [['1','2','3'],['4','5','6'],['7','8','9'],['1','4','7'],['2','5','8'],['3','6','9'],['1','5','9'],['3','5','7']];

	//Function to put X or O into the squares
	$scope.makeMove=function(idx){
		// alert(idx);
		// console.log('yay');
		if (($scope.board[idx].val!='x') && ($scope.board[idx].val!='o')){ //This lines checks to see if the board piece has already been taken
			// console.log('yay2');
			if ($scope.turnNumber%2==0){
				$scope.board[idx].val='x';
				$scope.board[idx].playerPieceImage= 'images/starfish1.png'; //Sets location of image to use for player x, which is the starfish
				$scope.xMoves.push((idx+1).toString()); //pushes current piece position into an array. Adding 1 because index starts at zero. My win logic starts numbering the squares at 1
				console.log($scope.xMoves);
			} else {
				$scope.board[idx].val='o';
				$scope.board[idx].playerPieceImage= 'images/seashell1_edited.png';//Sets location of image to use for player o, which is the shell
				$scope.oMoves.push((idx+1).toString());//pushes current piece position into an array. Adding 1 because index starts at zero. My win logic starts numbering the squares at 1
				// console.log($scope.oMoves); 
			}
			//goes in here if there have been at least 5 turns, meaning there can be a winner
			if($scope.turnNumber>=4){
				$scope.winningPlayer='';

				if($scope.turnNumber%2==0){
					console.log('went into check win conditions for x player');
					// console.log($scope.winningCombinations.length);

					//Checks win conditions against current player's moves up until now
					for (var i = 0; i<$scope.winningCombinations.length;i++){
						if(($scope.xMoves.indexOf($scope.winningCombinations[i][0])!=-1)&&($scope.xMoves.indexOf($scope.winningCombinations[i][1])!=-1)&&($scope.xMoves.indexOf($scope.winningCombinations[i][2])!=-1)){
							console.log('x wins');
							$scope.someoneWon=true;
							$scope.winningPlayer='starfish';
						}

					}
				} else{
					console.log('went into check win conditions for x player');
					// console.log($scope.winningCombinations.length);

					//Checks win conditions against current player's moves up until now
					for (var i = 0; i<$scope.winningCombinations.length;i++){
						if(($scope.oMoves.indexOf($scope.winningCombinations[i][0])!=-1)&&($scope.oMoves.indexOf($scope.winningCombinations[i][1])!=-1)&&($scope.oMoves.indexOf($scope.winningCombinations[i][2])!=-1)){
							console.log('o wins');
							$scope.someoneWon=true;
							$scope.winningPlayer='seashell';
						}

					}//end cycling through win conditions
				}//end checking if someone won

				//Cat's game logic. Only goes in here on the 9th turn (counting starts at 0) and if there's no winner
				if($scope.turnNumber==8 && !$scope.someoneWon){
					$scope.catsGame=true;
				}

			}
			$scope.turnNumber++; //increment turn number
				

		} //end if this board space not already taken
	};//end $scope.makeMove=function(idx)


	// $scope.newGame=function(){
	// 	console.log('went into new game')
	// 	// //initialize board to empty strings
	// 	// $scope.board=[{val:'',playerPieceImage:''},
	// 	// 				{val:'',playerPieceImage:''},
	// 	// 				{val:'',playerPieceImage:''},
	// 	// 				{val:'',playerPieceImage:''},
	// 	// 				{val:'',playerPieceImage:''},
	// 	// 				{val:'',playerPieceImage:''},
	// 	// 				{val:'',playerPieceImage:''},
	// 	// 				{val:'',playerPieceImage:''},
	// 	// 				{val:'',playerPieceImage:''}];
	// 	console.log('scope.board.length =' + $scope.board.length)
	// 	for (var q = 0; q<$scope.board.length; q++){
	// 		$scope.board[q].val='';
	// 		$scope.board[q].playerPieceImage='';
	// 		console.log($scope.board[q].val);
	// 		console.log($scope.board[q].playerPieceImage);
	// 	}

	// 	$scope.turnNumber = 0;

	// 	//holds image location for each piece. location of image set after a piece has been clicked on
	// 	$scope.imgSource='';

	// 	$scope.xMoves=[];
	// 	$scope.oMoves=[];
	// 	$scope.winningPlayer = '';//Set to name of winning player
	// 	$scope.someoneWon = false; //set to true when someone wins
	// 	$scope.catsGame=false;//set to true if it's a cat's game
	// };

}); //End makeMove function