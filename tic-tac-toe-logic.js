		//************************************************
		//***********START FUNCTION DEFINITIONS***********
		//************************************************

		//Function declaration for event handler on mouse over. Is called below for when something is moused over
		var eventHandlerMouseOver = function(data){
			//flags that check if board piece taken
			var takenFlag = this.classList.contains('taken');//checks if there's already an x or o in this spot
	        var blueFlag = this.classList.contains('blue');//check if the blue class is applied
	        var pinkFlag = this.classList.contains('pink');//check if the blue class is applied

			//If not already taken, remove class pink, apply class blue
	        if (!takenFlag){
	        	if(pinkFlag){
	        		this.classList.remove('pink');//removes pink class if it is not currently in the div/box
	        	}
				if (!blueFlag){
	        		this.classList.add('blue');//adds blue class if it currently exists
	        	}
	        }
	        //this cancels the typical behavior of the clicked element
	        return false;
		} ;//End event handler function definition


		//Function declaration for event handler. Is called below for when something is moused out of
		var eventHandlerMouseOut = function(data){
			//*****Debugging console logs*****
			// console.log('Went into eventHandlerMouseOut.');
			// console.log('Class name of this div/square is:');
			// console.log(this.className);

	        // console.log('Square already taken or not? ');
	        // console.log(this.classList.contains('taken'));

	        var takenFlag = this.classList.contains('taken');//checks if there's already an x or o in this spot
	        var blueFlag = this.classList.contains('blue');//check if the blue class is applied
	        var pinkFlag = this.classList.contains('pink');//check if the blue class is applied

	        //If not already taken, set background back to pink
	        if (!takenFlag){
	        	if (blueFlag){
	        		this.classList.remove('blue');//removes blue class if it currently exists
	        	}
	        	if(!pinkFlag){
	        		this.classList.add('pink');//adds pink class if it is not currently in the div/box
	        	}

	        }


	        //this cancels the typical behavior of the clicked element
	        return false;
		} ;//End event handler function definition


		//Function declaration for event handler. Is called below for when something is clicked
		var eventHandlerMouseDown = function(event){
			//*****Debugging console log*****
	        //console.log('Inside eventHandlerMouseDown. Turn number: '+ turnNumber);
	        
	        var takenFlag = this.classList.contains('taken');//checks if there's already an x or o in this spot
	        
	        //only goes in here if the spot's not already taken
	        if (!takenFlag){
	        	//First checks to see if it's player 1's turn
		        if(turnNumber %2 == 0){
		        	//puts an X in the gameboard
		       	this.innerHTML="<img class='gameBoardSquare' src='images/starfish1.png'></div>";
		        	//adds the classes x and taken to the div element
		        	this.classList.add('x', 'taken');

		        	//The next 4 lines change which player is marked as having the current turn, so that the styling can change accordingly
		        	document.getElementById('player2').classList.add('currentTurn');
		        	document.getElementById('player2').classList.remove('notCurrentTurn');
		        	document.getElementById('player1').classList.remove('currentTurn');
		        	document.getElementById('player1').classList.add('notCurrentTurn');
		        }
		        else{  //goes into the else if it's player 2's turn

		        	//puts an O in the gameboard
		        	this.innerHTML="<img class='gameBoardSquare' src='images/seashell1_edited.png'></div>";
		        	//adds the classes o and taken to the div element
		        	this.classList.add('o', 'taken');

					//The next 4 lines change which player is marked as having the current turn, so that the styling can change accordingly
		        	document.getElementById('player1').classList.add('currentTurn');
		        	document.getElementById('player1').classList.remove('notCurrentTurn');
		        	document.getElementById('player2').classList.remove('currentTurn');
		        	document.getElementById('player2').classList.add('notCurrentTurn');
		        }
        	
        		//Checks for a winner here, only if the turn is at least 4, because no winner can occur until at least move 5.
	        	if (turnNumber>=4){
					console.log('Time to start checking for a winner');

					
					if (turnNumber%2==0){
						winner = findWinner(true, false);//findWinner(xturn, oturn)
					} else{
						winner = findWinner(false, true);//findWinner(xturn, oturn)
					}

					//Goes here if there's a winner
					if (winner){
						//Grays out rest of boxes and disable clicking if there's a winner
						var makeGray= document.getElementsByClassName('square');
						var winningPlayer = '';

						//Make all fields gray and not able to be clicked
						for (var z=0; z<makeGray.length ; z++){
							makeGray[z].classList.add('taken');
						}
						
						if (turnNumber%2==0){
							winningPlayer = 'Player 1';
						} else {
							winningPlayer = 'Player 2';
						}

						//Get div to show a winner 
						document.getElementById('winnerIdentityDiv').innerHTML = "<h1 id='winnerIdentity'>The winner is " + winningPlayer + '!</h1>';

						//Clear out div showing whose turn it is
						removePlayerTurn();

						//Show the sand castle for playing again
						showPlayAgainButton();
					}
					
				}
				//Cat's game logic
				if (turnNumber==8 && !winner){
					document.getElementById('winnerIdentityDiv').innerHTML="<h1id='winnerIdentity'>Cat's game. Better luck next time!</h1>";
					//Clear out div showing whose turn it is
					removePlayerTurn();
					//Show the sand castle for playing again
					showPlayAgainButton();
				}

	        	turnNumber++;//increments which turn number it is

        	}
	        //This cancels the typical behavior of the clicked element
	        return false;
		} ;
		//End event handler for when something is clicked

		function findWinner(xTurn, oTurn){
			var whoseTurn;

			if (xTurn){
				whoseTurn='x';
			} else if (oTurn) {
				whoseTurn='o';
			}

			classToLookFor = whoseTurn + " taken";

			var classTakenXO = document.getElementsByClassName(classToLookFor);
			
			// console.log(classTakenXO);

			var boxesSelected = [];//array to hold the box numbers that have been selected
			for (var i = 0; i < classTakenXO.length; i++){

				boxesSelected.push(classTakenXO[i].id);	//array to hold box numbers that have been selected
			}

			var win = false;//variable for if someone won
			
			//array of arrays that have winning conditions
			var winningCombinations = [['1','2','3'],['4','5','6'],['7','8','9'],['1','4','7'],['2','5','8'],['3','6','9'],['1','5','9'],['3','5','7']];


			// console.log('winningCombinations length: ');
			// console.log(winningCombinations.length);
			for (var q = 0; q<winningCombinations.length; q++){
				// console.log('winningCombinations[0][0]');
				// console.log(winningCombinations[0][0]);
				if (boxesSelected.indexOf(winningCombinations[q][0])!= -1){
					if (boxesSelected.indexOf(winningCombinations[q][1])!=-1){
						if (boxesSelected.indexOf(winningCombinations[q][2])!=-1){
							win = true;
						}
					}
				}
			}
			//console.log(boxesSelected);

			return win;
		}


		//Clears the x's and o's on the board at the end of the game. Called when the new game button is clicked.
		function clearBoard(){
			console.log(mySquares);
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
				mySquares[i].classList.remove('blue');
				mySquares[i].classList.add('pink');
				mySquares[i].classList.remove('x');
				mySquares[i].classList.remove('o');
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

		//**************************************
		//********END FUNCTION DEFINITIONS******
		//**************************************



		//**************************************
		//***********START GAME SETUP***********
		//**************************************
		//Finds all elements with class name of 'square'
		var mySquares = document.getElementsByClassName('square');

		var turnNumber = 0; //variable that holds which turn number it is

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

		var newGame = document.getElementById('playAgainImage');

		//*****  START EVENT LISTENERS FOR WHEN 'NEW GAME' BUTTON IS CLICKED  *****//

		//Clears the board of the game pieces
		newGame.addEventListener('click',clearBoard); 
		//Removes the taken flag from all board pieces so they can be clicked again
		newGame.addEventListener('click',removeTakenClass);
		//Adds the player turn information back in
		newGame.addEventListener('click', reinsertPlayerTurn);
		//Clears out the information about the winner
		newGame.addEventListener('click', removeWinnerAnnouncement);
		//Hides the play again button at the start of a new game
		newGame.addEventListener('click', removePlayAgainButton);

		//*****  END EVENT LISTENERS FOR WHEN 'NEW GAME' BUTTON IS CLICKED  *****//

		//**************************************
		//************END GAME SETUP************
		//**************************************