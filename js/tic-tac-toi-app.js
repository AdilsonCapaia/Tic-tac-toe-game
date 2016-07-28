/* ********************************************************************************\
*    Date : 25/07/2016                                                             *
*	 Creator : Adilson Adao Capaia                                                 *
*    Country : France                                                              *
*    Nationality: Angolan                                                          *
\**********************************************************************************/



//------------------------------------------------------------ Module Pattern------------- -----------------------------------------------------------

!function($){
	
	//-------------------------------------------  Game Class------------- --------------------------------
	function Game(){
		
		// method used to show start screen with the start button 
		this.start = function(){
			var div = document.createElement("div");
			div.className="screen";
			div.classList.add("screen-start");
			div.id="start";
			var h1 =document.createElement("h1");
			h1.innerHTML ="Tic Tac Toe";
			var Anchor = document.createElement("a");
			Anchor.setAttribute("href","#");
			Anchor.innerHTML = "Start game";
			Anchor.className="button";
	
			var header = document.createElement("header");
			header.appendChild(h1);
			header.appendChild(Anchor);
	
			div.appendChild(header);
			$(".board").remove();
			document.body.insertBefore(div, document.getElementsByTagName("script")[0]);
		};
		
		//function used to show the message if  the game has no winner (is tie (draw))
		this.finish =function(){
			var div = document.createElement("div");
			div.className="screen";
			div.classList.add("screen-win-tie");
			div.classList.add("screen-win");
			div.id="finish";
	
			var h1 =document.createElement("h1");
			h1.innerHTML ="Tic Tac Toe";
			
			var p =document.createElement("p");
			p.className ="message";
			var Anchor = document.createElement("a");
			Anchor.setAttribute("href","#");
			Anchor.innerHTML = "New game";
			Anchor.className="button";
	
			var header = document.createElement("header");
			header.appendChild(h1);
			header.appendChild(p);
			header.appendChild(Anchor);
	
			div.appendChild(header);
			$(".screen").remove();
			document.body.appendChild(div);
			
			$(".button").focus(function(){
				currentGame();
			}); 
		}
		// function used to show the message if the O player wins
		this.winO =function(){
			var div = document.createElement("div");
			div.className="screen";
			div.classList.add("screen-win-one");
			div.classList.add("screen-win");
			div.id="finish";
	
			var h1 =document.createElement("h1");
			h1.innerHTML ="Tic Tac Toe";
			
			var p =document.createElement("p");
			p.className ="message";
			p.innerHTML =" Winner";
			var Anchor = document.createElement("a");
			Anchor.setAttribute("href","#");
			Anchor.innerHTML = "New game";
			Anchor.className="button";
	
			var header = document.createElement("header");
			header.appendChild(h1);
			header.appendChild(p);
			header.appendChild(Anchor);
	
			div.appendChild(header);
			$("div").remove();
			document.body.insertBefore(div, document.getElementsByTagName("script")[0]);
			$(".button").focus(function(){
				
				currentGame();
				
			}); 
			
		}
		
		// function used to show the message if the X player wins
		this.winX =function(){
			var div = document.createElement("div");
			div.className="screen";
			div.classList.add("screen-win-two");
			div.classList.add("screen-win");
			div.id="finish";
	
			var h1 =document.createElement("h1");
			h1.innerHTML ="Tic Tac Toe";
			
			var p =document.createElement("p");
			p.className ="message";
			p.innerHTML =" Winner";
			var Anchor = document.createElement("a");
			Anchor.setAttribute("href","#");
			Anchor.innerHTML = "New game";
			Anchor.className="button";
			Anchor.classList.add("new-game");
	
			var header = document.createElement("header");
			header.appendChild(h1);
			header.appendChild(p);
			header.appendChild(Anchor);
	
			div.appendChild(header);
			$("div").remove();
			document.body.insertBefore(div, document.getElementsByTagName("script")[0]);
			
			
			$(".button").focus(function(){
				
				currentGame();
				
			}); 
			
		}	
		
	};
	//---------------------------------------------------- Board Class-------------------------------------------------------------
	
	// Global variables ---- "useful variables"
	var ALTERNATE = 0;
	var ACTIVEPLAYER =0;
	
	function Board(){
		// div main page
		this.$div = $("<div></div>");
		// the svg that show the O image
		this.$svgO =$('<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg>');
		// the svg that show the X image
		this.$svgX =$('<svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg>');
		// header for players 
		this.$header = $("<header></header>");
		this.$h1 = $("<h1>Tic Tac Toe ---</h1>");
		this.$ulPlayers =$("<ul></ul>");
		//player O
		this.$playerO =$('<li class="players player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li>');   
		//player X
		this.$playerX =$('<li class="players player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li>');
		
		this.$ulBoard=$("<ul>");
		// this function create the board
		this.board = function(){
			
			$("div").remove();
			this.$div.prop("id","board");
			this.$div.addClass("board");

			// append the li elements to the ul element
			this.$ulPlayers.append(this.$playerO);
			this.$ulPlayers.append(this.$playerX);
			// append the elements to the header
			this.$header.append(this.$h1);
			this.$header.append(this.$ulPlayers);
			
			this.$ulBoard.addClass("boxes");
			for(var i=0; i<9 ; i++){
				
				var $li =$("<li>");
				$li.addClass("box");
				this.$ulBoard.append($li);
			}
			
			this.$div.append(this.$header);
			this.$div.append(this.$ulBoard);
			$("#start").remove();
			$("body").prepend(this.$div);
		};
		// useful array that contain the svg images X and O
		this.alternate =[]
		this.alternate.push(this.$svgX);
		this.alternate.push(this.$svgO );
		//this function alternate the players ( between X and O)
		this.alternatePlayer =function(){
			ALTERNATE++;
			if(ALTERNATE >1){ ALTERNATE = 0;}
			
			if(ALTERNATE == 1){
				console.log("Player O");
				return this.alternate[1];	
			}
			else{
				console.log("Player X");
				return this.alternate[0];
			}	
		}
		//this function alternate the active players on the header ( between X and O)
		this.activePlayer= function(){
			
			ACTIVEPLAYER++;
			if(ACTIVEPLAYER >1){ ACTIVEPLAYER = 0;}
			
			
			if(ACTIVEPLAYER == 1){
				
				this.$playerX.removeClass("active");
				this.$playerO.addClass("active");
				this.$playerO.prop("id","player1");
				return this.$playerO;
				
			}else{
				this.$playerO.removeClass("active");
				this.$playerX.addClass("active");
				this.$playerX.prop("id","player2");
				return this.$playerX;
			}
		}
	}
	// show the screen with the start button
	var game = new Game();
	game.start();
	
	function currentGame(){
		//useful variables
		var currentPlayer;
		var activeP;
		// Create a eventhandler to start the game
		$(".button").click(function(){
			// create a new instance of Board class
			var  field = new Board();
			field.board();
			// "activeP"  hold the active  player
			activeP= field.activePlayer();
			// hold the current svg to mouseover event on the board
			currentPlayer = field.alternatePlayer();
		
			$(".boxes li").mouseover(function(){
				$(this).append(currentPlayer);
			}).click(function(){
			
				if(activeP.hasClass("player2") && !($(this).hasClass("box-filled-2") || $(this).hasClass("box-filled-1"))){
					$(this).children("svg").hide();
					$(this).addClass("box-filled-2");
					activeP = field.activePlayer();
					currentPlayer = field.alternatePlayer();
				
				}else if(activeP.hasClass("player1") && !($(this).hasClass("box-filled-2") || $(this).hasClass("box-filled-1"))){
					$(this).children("svg").hide();
					$(this).addClass("box-filled-1");
					activeP = field.activePlayer();
					currentPlayer = field.alternatePlayer();
				}else{  
				} 
					// verify the winner
				var end = $(".boxes li").length; 
				$(".boxes li").each(function(){
					if($(this).hasClass("box-filled-2") || $(this).hasClass("box-filled-1") ){
					end--;	
					}
				});
				if(end === 0){
					game.finish();
				}
			});
		});
	
	}//End currentGame() function
	
	// call currentGame()
	currentGame();	
	
}(jQuery);

	
