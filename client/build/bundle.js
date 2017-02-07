/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var UI = __webpack_require__(1);
	
	var app = function() {
	  var ui = new UI();
	  
	}
	
	window.onload = app;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Logic = __webpack_require__(2);
	var MythFacts = __webpack_require__(5);
	
	var UI = function (){
	  this.counter = 0;
	  this.logic = new Logic();
	  this.mythFacts = new MythFacts();
	  this.view = document.querySelector('#view');
	  this.content = document.querySelector("#content");
	  this.body = document.querySelector('body');
	  this.infoDiv = document.createElement("div");
	  this.logic.quizCreator("Apollo");
	}
	
	UI.prototype = {  
	// When next character called it calls function getWiki in mythFacts and passes it character name and the render function from this module while binding this module.
	//   nextCharacter: function(){
	//     this.mythFacts.getWiki(this.logic.characters[this.counter].name, this.render.bind(this));
	//     this.counter ++;
	//   }
	}
	
	module.exports = UI;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Character = __webpack_require__(3);
	var CharacterInfo = __webpack_require__(6);
	var ViewLogic = __webpack_require__(4);
	
	var Logic = function() {
	  this.character = null;
	  this.characterInfo = new CharacterInfo();
	  this.viewLogic = new ViewLogic();
	  this.generateCharacter();
	  this.questionCounter = 0;
	  this.characterName = null;
	  this.view = document.querySelector('#view');
	  this.container = document.querySelector('#container');
	}
	
	Logic.prototype = {
	  generateCharacter: function(){
	    this.characters = [];
	    this.characters.push(new Character("Heracles"));
	    this.characters.push(new Character("Apollo"));
	    this.characters.push(new Character("Athena"));
	    this.characters.push(new Character("Jason"));
	  },
	
	
	// This creates the character select screen with 4 button images each if the value of the character key and click function that calls to create the quiz
	// charSelected = null;
	
	// var characterSelectCreator = function(quizData){
	//   mainDiv = document.querySelector("#info")
	//   // wipe all children from div this is assigned to
	//   mainDiv.innerHTML = null;
	//   // require in UI the quiz json data to be used
	//   for (character of quizData){
	//     button = document.createElement("button")
	//     button.id = "charButton"
	//     button.type = character.image;
	//     button.value = character;
	//     button.onclick = quizCreator(this.value);
	//     mainDiv.appendChild(button);
	//   }
	// };
	
	// This creates the quiz getting the main div and parenting it with a new quiz div that holds the characters questions. This also creates a false/true button and appends it to the quiz div.
	
	
	quizCreator: function(characterName){
	  // console.log(characterName);
	  this.characterName = characterName;
	  this.character = this.characterInfo.retrieveCharacter(characterName);
	  // console.log(this.character);
	  var quizDiv = document.createElement("div");
	  var container = document.querySelector("#container");
	  quizDiv.innerHTML = null;
	  quizDiv.className = "fact-box";
	  container.appendChild(quizDiv);
	
	  var quizContent = document.createElement("div");
	  // console.log(this.character);
	  // console.log(this.characterName);
	  quizContent.innerText = this.character.questions[this.questionCounter].question;
	  quizDiv.appendChild(quizContent);
	  var buttonDiv = document.createElement("div");
	  buttonDiv.className = "buttonDiv";
	  var falseButton = document.createElement("button");
	  var trueButton = document.createElement("button");
	  falseButton.className = "answerButton";
	  trueButton.className = "answerButton";
	  falseButton.onclick = function(){this.quizButtonOnClick(false)
	  }.bind(this);
	  falseButton.value = false;
	  falseButton.innerText = "False"
	  trueButton.onclick = function(){this.quizButtonOnClick(true)
	  }.bind(this);
	  trueButton.value = true;
	  trueButton.innerText = "True"
	
	  quizDiv.appendChild(falseButton);
	  quizDiv.appendChild(trueButton);
	},
	
	  // quizButton has the on click function that first gets the answer for the question then checks if it is equal to the false/true button clicked. It then calls to check the game state and evaluates if the player has won and will quit its function. If the player hasn't won it will call the scroll function,increase the question counter and create the next quiz question. If the player got the answer wrong it will call the failQuizDiv function.
	
	  quizButtonOnClick : function(choice){
	    // console.log(this.questionCounter);
	    // console.log(this.character.questions[this.questionCounter]);
	    var answer = this.character.questions[this.questionCounter].answer;
	
	
	    if ( answer === choice){
	      console.log("your right!");
	      this.questionCounter ++;
	      this.checkGameState();
	    } else {
	      console.log("you failed ya numpty");
	      this.failDiv();
	    }
	  },
	
	  // checkGameState is the function used to check if the player has won by evaluating if the questionCounter reached the last question by comparing the length to the characters amount of questions
	
	  checkGameState : function(){
	    // console.log(this.questionCounter);
	    // console.log(this.character.questions.length);
	    if (this.questionCounter === this.character.questions.length){
	      console.log("hits first part of if statement")
	      this.winDiv();
	    } else {
	      console.log("hit continue function");
	      this.continue();
	    }
	  },
	
	  continue : function () {
	    var quizDiv = document.querySelector(".fact-box");
	    quizDiv.parentNode.removeChild(quizDiv);
	    this.viewLogic.move(this.view.scrollLeft+100, function(){
	      this.quizCreator(this.characterName)
	    }.bind(this));
	  },
	
	// winDiv creates the win box returning a gracious message and a button that returns to the character select screen to begin the quiz again
	
	winDiv : function(){
	  var quizDiv = document.querySelector(".fact-box");
	  quizDiv.parentNode.removeChild(quizDiv);
	  var div = document.createElement("div");
	  div.className = "fact-box";
	  var input = document.createElement("input");
	  var button = document.createElement("button");
	  div.innerText = "You have completed your 12 labours and your climb to Olympus! \n You are welcome at the table of the gods Olympian";
	  button.innerText = "Start new game!";
	  var returnToHome = function(){
	    this.questionCounter = 0;
	    // this.character = null;
	    // this.characterName = "Athena";
	    this.view = document.querySelector('#view');
	    this.view.scrollLeft = 0;
	    this.quizCreator(input.value);
	  }
	  button.onclick = returnToHome.bind(this);
	  div.appendChild(button);
	  div.appendChild(input);
	  this.container.appendChild(div);
	},
	
	failDiv: function(){
	  var quizDiv = document.querySelector(".fact-box");
	  quizDiv.parentNode.removeChild(quizDiv);
	  var div = document.createElement("div");
	  div.className = "fact-box";
	  var button = document.createElement("button");
	  div.innerText = "You have failed the Gods and now you must suffer in Hades' frosty bosom";
	  button.innerText = "Back to the Underworld";
	  button.className = "answerButton";
	  button.onclick = function(){
	    this.view.scrollLeft = 0;
	    this.questionCounter = 0;
	    this.quizCreator(this.characterName);
	  }.bind(this);
	  this.container.appendChild(div);
	  div.appendChild(button);
	}
	
	}
	
	module.exports = Logic;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var Character = function(name){
	  this.name = name;
	}
	
	Character.prototype = {
	
	}
	
	module.exports = Character;

/***/ },
/* 4 */
/***/ function(module, exports) {

	var ViewLogic = function(){
		
	}
	
	ViewLogic.prototype = {
		move: function(destination, event){
		    var scroller = function(destination){
	
		      var view = document.querySelector('#view'); 
		      console.log(view.scrollLeft);
	
		      if (view.scrollLeft <= destination){
		        var y = view.scrollLeft;
		        view.scrollLeft = y+5;
	
		        if(view.scrollLeft >= destination){
		          event();
		          clearInterval(smoothScroll);
		        } 
		      } else if (view.scrollLeft >= destination){
		        var y = view.scrollLeft;
		        view.scrollLeft = y-5;
	
		        if(view.scrollLeft <= destination){
		          event();
		          clearInterval(smoothScroll);
		        }
		      }
		    }
	
		    var smoothScroll = setInterval(function(){scroller(destination)}, 20);
		    console.log(view.scrollLeft);
		  },
		  scrollMaster: function(destination, event){
		    this.move(destination, event);
		    console.log("back");
		  }
	}
	
	module.exports = ViewLogic;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var MythFacts = function(){
	
	}
	
	MythFacts.prototype = {
	  makeRequest: function(url, callback){
	    var request = new XMLHttpRequest();
	    request.open("GET", url);
	    request.onload = callback;
	    request.send();
	  },
	
	  getWiki: function(mythQuery, callback){
	    var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + mythQuery + "&origin=*";
	    this.makeRequest(url, function(){
	      if (this.status !== 200){
	        return;
	      } else {
	        var info = JSON.parse(this.responseText).query.pages;
	        var pageKey = Object.keys(info)[0];
	        var page = info[pageKey].extract;
	        callback(page);
	      }
	    });
	  }
	
	}
	
	module.exports = MythFacts;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var CharacterInfo = function(){ 
	this.characters = {
	 jason : { 
	    name: "Jason",
	    questions: [{
	      question: "Jason was the leader of the Argonauts",
	      answer: true
	    },
	    {
	      question: "Jason was married to a sorceress",
	      answer: true
	    },
	    {
	      question: "Jason and his men were hunting for a black fleece",
	      answer: false
	    },
	    {
	      question: "On their travels, the Argonauts encountered a tribe of giants called the Gegeines, who had 6 arms",
	      answer: true
	    },
	    {
	      question: "Jason and his Argonauts once accidentally killed lots of their allies because they didn't recognise them in the dark.",
	      answer: true
	    },
	    {
	      question: "The Harpies were monsters with the face of a woman and the wings of a bat.",
	      answer: false
	    },
	    {
	      question: "After surviving the wrath of the gods, 6-armed giants, and a jealous sorceress, Jason was eventually killed by his own boat.",
	      answer: true
	    },
	    {
	      question: "Jason was once voiced by William Shatner",
	      answer: true
	    },
	    {
	      question: "Jason was raised by a Satyr",
	      answer: false
	    },
	    {
	      question: "To retrieve the Golden Fleece, Jason was required to complete three tasks. One of these was to plough a field with fire-breathing oxen.",
	      answer: true
	    },
	    {
	      question: "Another task was to defeat the Cyclopes.",
	      answer: false
	    },
	    {
	      question: "The magical warriors called Spartoi appeared when Jason sowed a field with a dragon's teeth.",
	      answer: true
	    }]
	  },
	
	  athena : {
	    name: "Athena", 
	    questions: [{
	      question: "Athena was born from zeus.",
	      answer: true
	    },
	    {
	      question: "Athena is the goddess of war.",
	      answer: true
	    },
	    {
	      question: " Athena wields the aegis and thunderbolt for zeus.",
	      answer: true
	    },
	    {
	      question: "Her mother was Aphrodite.",
	      answer: false
	    },
	    {
	      question: "Athena was a patron of the arts and crafts, especially when it came to spinning and weaving.",
	      answer: true
	    },
	    {
	      question: "Athena served as a guardian of Crete, where the Parthenon served as her temple.",
	      answer: false
	    },
	    {
	      question: "The hawk was her bird and the willow tree was hers.",
	      answer: false
	    },
	    {
	      question: "Athena invented the harp but never played it.",
	      answer: false
	    },
	    {
	      question: "Athena is one of the four virgin goddess.",
	      answer: false
	    },
	    {
	      question: "Athena is a shapeshifter.",
	      answer: true
	    },
	    {
	      question: "Athena was born from zeus on the island of Crete.",
	      answer: false
	    },
	    {
	      question: "Odysseus was Athena’s uncle.",
	      answer: false
	    }]
	  },
	
	
	
	
	  heracles : {
	    name: "Heracles", 
	    questions: [{
	      question: "There were 10 Labors of Heracles.",
	      answer: false
	    },
	    {
	      question: "Heracles was the last mortal son of Zeus.",
	      answer: true
	    },
	    {
	      question: " Heracles' mother was the Godess Hera.",
	      answer: false
	    },
	    {
	      question: "Athena was the person who issued Heracles with the 12 Labors.",
	      answer: false
	    },
	    {
	      question: "Slaying the Lernaean Hydra was Heracles final Labor.",
	      answer: false
	    },
	    {
	      question: "Heracles had a twin brother, who had a different father.",
	      answer: true
	    },
	    {
	      question: "The reason Heracles had to perform the 12 Labors was because he had murdered his own children.",
	      answer: true
	    },
	    {
	      question: "One of Heracles' 12 Labors was to kill Medusa.",
	      answer: false
	    },
	    {
	      question: "Heracles' iconic weapon of choice was a sword.",
	      answer: false
	    },
	    {
	      question: "As a symbol of masculinity and warriorship, Heracles had a number of male lovers.",
	      answer: true
	    },
	    {
	      question: "Heracles was a god during his life.",
	      answer: false
	    },
	    {
	      question: "Heracles died from poison.",
	      answer: true
	    }]},
	
	    apollo : {
	      name: "Apollo",
	      questions: [{
	        question: "Zeus and Hera were the parents of Apollo",
	        answer: false
	      },
	      {
	        question: "Apollo was the patron of Delphi",
	        answer: true
	      },
	      {
	        question: "Asclepius is the son of Apollo",
	        answer: true
	      },
	      {
	        question: "Artemis is the twin sister of Apollo",
	        answer: true
	      },
	      {
	        question: "The lyre Apollo carries was created and given to him by Hermes",
	        answer: true
	      },
	      {
	        question: "Apollo was born in Mount Olympus",
	        answer: false
	      },
	      {
	        question: "Python was defeated by Apollo",
	        answer: true
	      },
	      {
	        question: "Apollo aided Paris in killing Achilles by guiding the arrow of his bow to Achilles heel",
	        answer: true
	      },
	      {
	        question: "Apollo had three sons to Cyrene",
	        answer: false
	      },
	      {
	        question:"Apollo won the musical challenge of Pan",
	        answer: true
	      },
	      {
	        question: "Hera sent the Chimera to hunt Apollo",
	        answer: false
	      },
	      {
	        question: "Apollo was leader of the Muses",
	        answer: true
	      }
	      ]
	    }
	  }
	}
	
	  CharacterInfo.prototype = {
	    retrieveCharacter: function(characterName){
	      console.log(this.characters);
	      for(var key in this.characters){
	        if(this.characters[key].name === characterName){
	          return this.characters[key];
	        }
	      }
	    }
	  }
	
	  module.exports = CharacterInfo;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map