		//********************************************************************************
		//***********************    START FUNCTION DEFINITIONS   ************************
		//********************************************************************************

		//Function declaration for event handler on mouse over. Is called below for when something is moused over
		function eventHandlerMouseOver(data){
			var takenFlag = this.classList.contains('taken');//checks if there's already an x or o in this spot
	        var blueFlag = this.classList.contains('blue');//check if the blue class is applied

			//If not already taken, apply class blue, which has an opacity
	        if (!takenFlag){
				if (!blueFlag){
	        		this.classList.add('blue');//adds blue class if it currently exists
	        	}
	        }
	        //this cancels the typical behavior of the clicked element
	        return false;
		} ;//End event handler function definition


		//Function declaration for event handler. Is called below for when something is moused out of
		function eventHandlerMouseOut(data){
			//*****Debugging console logs*****
			// console.log('Went into eventHandlerMouseOut.');
			// console.log('Class name of this div/square is:');
			// console.log(this.className);

	        var takenFlag = this.classList.contains('taken');//checks if there's already an x or o in this spot
	        var blueFlag = this.classList.contains('blue');//check if the blue class is applied

	        //If not already taken, remove class blue, which has opacity
	        if (!takenFlag){
	        	if (blueFlag){
	        		this.classList.remove('blue');//removes blue class if it currently exists
	        	}
	        }
	        //this cancels the typical behavior of the clicked element
	        return false;
		} ;//End event handler function definition

		//Function declaration for event handler. Is called below for when something is clicked
		function eventHandlerMouseDown (event){
			//*****Debugging console log*****
	        // console.log('Inside eventHandlerMouseDown. Turn number: '+ turnNumber);
	        
	        var takenFlag = this.classList.contains('taken');//checks if there's already an x or o in this spot

	        //Only allows user to click if the spot's not already taken
	        if (!takenFlag){
	        	//First checks to see if it's player 1's turn
		        if(turnNumber %2 == 0){
		        	//puts an X in the gameboard
		       		this.innerHTML="<img class='gameBoardSquare' src='images/starfish1.png'></div>";
		        	//adds the classes x and taken to the div element
		        	this.classList.add('x', 'taken');
		        	//The function below changes which player is marked as having the current turn, so that the styling can change accordingly
					showWhoseTurn('player1', 'player2');
		        }
		        else{  //goes into the else if it's player 2's turn

		        	//puts an O in the gameboard
		        	this.innerHTML="<img class='gameBoardSquare' src='images/seashell1_edited.png'></div>";
		        	//adds the classes o and taken to the div element
		        	this.classList.add('o', 'taken');
					//The function below changes which player is marked as having the current turn, so that the styling can change accordingly
		        	showWhoseTurn('player2', 'player1');
		        }
        	
        		//Checks for a winner here, only if the turn is at least 4, because no winner can occur until at least move 5.
	        	if (turnNumber>=4){
					// console.log('Time to start checking for a winner');
					var winningPlayer = '';
					
					//Function that figures out if someone won
					if (turnNumber%2==0){
						//winner = findWinner(true, false);//findWinner(xturn, oturn)
						winner = findWinner('x');
						winningPlayer = 'Starfish';
					} else{
						//winner = findWinner(false, true);//findWinner(xturn, oturn)
						winner = findWinner('o');
						winningPlayer = 'Seashell';
					}

					//Goes here if there's a winner
					if (winner){
						//Grays out rest of boxes and disable clicking if there's a winner
						var makeGray= document.getElementsByClassName('square');

						//Make all fields gray and not able to be clicked
						for (var z=0; z<makeGray.length ; z++){
							makeGray[z].classList.add('taken');
						}
						
						//Get div to show a winner 
						document.getElementById('winnerIdentityDiv').innerHTML = "<h1 id='winnerIdentity'>" + winningPlayer + ' wins!</h1>';

						//Clear out div showing whose turn it is
						removePlayerTurn();

						//Show the play again button
						showPlayAgainButton();
					}
					
					//Cat's game logic. Only goes in here on the 9th turn (counting starts at 0) and if there's no winner
					if (turnNumber==8 && !winner){
						//Show cat's game message
						document.getElementById('winnerIdentityDiv').innerHTML="<h1 id='winnerIdentity'>Cat's game. Better luck next time!</h1>";
						//Clear out div showing whose turn it is
						removePlayerTurn();
						//Show the sand castle for playing again
						showPlayAgainButton();
					}

				}


	        	turnNumber++;//increments which turn number it is

        	}
	        //This cancels the typical behavior of the clicked element
	        return false;
		} ;
		//End event handler for when something is clicked

        function showWhoseTurn(currentPlayer, previousPlayer){
				document.getElementById(previousPlayer).classList.add('currentTurn');
	        	document.getElementById(previousPlayer).classList.remove('notCurrentTurn');
	        	document.getElementById(currentPlayer).classList.remove('currentTurn');
	        	document.getElementById(currentPlayer).classList.add('notCurrentTurn');
        }

		function findWinner(whoseTurn){
			//variable for if someone won
			var win = false;

			//Array of arrays that have winning conditions
			//Write separate function later
			var winningCombinations = [['1','2','3'],['4','5','6'],['7','8','9'],['1','4','7'],['2','5','8'],['3','6','9'],['1','5','9'],['3','5','7']];

			//String of classes to be used later to filter which spots were taken by x or o
			classToLookFor = whoseTurn + " taken";
			//Gets all elements that have been taken by the current player's turn
			var classTakenXO = document.getElementsByClassName(classToLookFor);
		
			//Array to hold box numbers that have been previously taken by current player
			var boxesSelected = [];
			for (var i = 0; i < classTakenXO.length; i++){
				boxesSelected.push(classTakenXO[i].id);	
			}

			//Cycles through array of winning combinations to check if current player has won
			for (var q = 0; q<winningCombinations.length; q++){
				if ((boxesSelected.indexOf(winningCombinations[q][0])!= -1)&&(boxesSelected.indexOf(winningCombinations[q][1])!=-1)&&(boxesSelected.indexOf(winningCombinations[q][2])!=-1)){
							win = true;
				}
			}
			return win;
		}

		//Called when the new game button is clicked.
		//Clears the x's and o's on the board at the end of the game. 
		//Turns turn number back to 0
		//Resets winner back to false
		function clearBoard(){
			//console.log(mySquares);
			for (var i = 0; i<numSquares; i++){
				mySquares[i].innerHTML = '';
			}
			turnNumber = 0;
			winner=false;
		}
		//Removes the taken class from all board pieces. Called when the new game button is clicked.
		function removeTakenClass(){
			for (var i = 0; i<numSquares; i++){
				mySquares[i].classList.remove('taken');
				mySquares[i].classList.remove('x');
				mySquares[i].classList.remove('o');
				mySquares[i].classList.remove('blue');
				// mySquares[i].classList.add('pink');
			}
		}
		//Remove the player turn divs. Called when someone wins the game.
		function removePlayerTurn(){
			document.getElementById('playerTurn').innerHTML = '';
		}
		//Insert the player turn divs back in. Called when the new game button is clicked.
		function reinsertPlayerTurn(){
			document.getElementById('playerTurn').innerHTML = "<h4>Waiting for next move from:</h4><p class='currentTurn' id='player1'>Player 1</p><p class='notCurrentTurn' id='player2'>Player 2</p>";
		}
		//Remove the winner announcement at the start of a new game. Called when the new game button is clicked.
		function removeWinnerAnnouncement(){
			document.getElementById('winnerIdentityDiv').innerHTML='';
		}
		//Hide the play again button at the start of a new game. Called when the new game button is clicked.
		function removePlayAgainButton(){
			// document.getElementById('playAgain').innerHTML = '';
			document.getElementById('playAgainImage').style.display='none';
		}
		//Show the play again button at the end of a game. Called when the game ends, either when there's a cat's game or a winner
		function showPlayAgainButton(){
			// document.getElementById('playAgain').innerHTML ="<input id='playAgainImage' type='image' src='images/sandcastle.png' value='Play again'>";
			document.getElementById('playAgainImage').style.display='block';
		}

		//********************************************************************************
		//************************    END FUNCTION DEFINITIONS    ************************
		//********************************************************************************


		//********************************************************************************
		//****************************    START GAME SETUP    ****************************
		//********************************************************************************
		
		//Finds all elements with class name of 'square'
		var mySquares = document.getElementsByClassName('square');
		//Variable that holds which turn number it is
		var turnNumber = 0; 
		//Figure out number of squares
		var numSquares = mySquares.length;
		//Flag for if there's a winner
		var winner=false;

		//Specify which HTML elements should get wired up to event handlers
		for (var i = 0; i < numSquares;i++) {
			mySquares[i].addEventListener('mouseover', eventHandlerMouseOver); //Adds event listener for all squares for mouse over
			mySquares[i].addEventListener('mouseout', eventHandlerMouseOut); //Adds event listener for all squares for mouse out
			mySquares[i].addEventListener('click', eventHandlerMouseDown); //Adds event listener for all squares for mouse down
		}

		//*****  START EVENT LISTENERS FOR WHEN 'Play Again' BUTTON IS CLICKED  *****//

		var newGame = document.getElementById('playAgainImage');

		//Clears the board of the game pieces
		newGame.addEventListener('click',clearBoard); 
		//Removes the taken flag from all board pieces so they can be clicked again
		newGame.addEventListener('click',removeTakenClass);
		//Adds the player turn information back in
		newGame.addEventListener('click', reinsertPlayerTurn);
		//Clears out the announcement of the winner
		newGame.addEventListener('click', removeWinnerAnnouncement);
		//Hides the play again button at the start of a new game
		newGame.addEventListener('click', removePlayAgainButton);

		//*****  END EVENT LISTENERS FOR WHEN 'NEW GAME' BUTTON IS CLICKED  *****//

		//********************************************************************************
		//*******************************  END GAME SETUP  *******************************
		//********************************************************************************
