$(document).ready(function() {
    var characters = {
        "Dr. Mario": {
            name: "Dr. Mario",
            health: 120,
            attack: 8,
            imageUrl: "assets\images\Dr. Mario.jpg",
            enamyAttackBack: 15
        },
        "Peach": {
            name: "Peach",
            health: 100,
            attack: 14,
            imageUrl: "assets\images\Peach.jpg",
            enamyAttackBack: 5
        },
        "Marth": {
            name: "Marth",
            health: 150,
            attack: 8,
            imageUrl: "assets\images\Marth.jpg",
            enamyAttackBack: 5
        },
        "Falco": {
            name: "Falco",
            health: 180,
            attack: 7,
            imageUrl: "assets\images\Falco.jpg",
            enamyAttackBack: 25
        }
    };
      var currSelectionCharacter;
      var combatants = [];
      var currDefender;
      var turnCounter = 1;
      var killCount = 0;

      var renderOne = function(character, renderArea, charStatus) {
          var charDiv = $("<div class='character' data-name'" + character.name + "'>");
          var charName = $("<div class='character-name'>").text(character.name);
          var charImage = $("<img atl='image' class='character-image'>").attr("src", character.imageUrl);
          charDiv.append(charName).append(charImage).append(charHealth);
          $(renderArea).append(charDiv);

          if (charStatus === "enemy") {
              $(charDiv).addClass("enemy");
          }
      };
      var renderMessage = function(message) {

          var gameMessageSet = $("#game-message");
          var newMessage = $("<div>").text(message);
          gameMessageSet.append(newMessage);

          if(message === "clearMessage") {
              gameMessageSet.text("");
          }
      }

      var renderCharacters = function(charObj, areaRender) {
          if(areaRender === "#characters-section") {
              $(areaRender).empty();
              for (var key in charObj) {
                  if(charObj.hasOwnProperty(key)) {
                      renderOne(charObj[key], areaRender, "");
                  }
              }
          }

          if (areaRender === "#selected-character") {
              renderOne(charObj, areaRender, "");
          }

          if (areaRender === "#available-to-attack-section") {
              for (var i = 0; i < charObj.length; i++) {
                  renderOne(charObj[i], areaRender, "");
              }

              $(document).on("click", ".enemy", function() {
                  var name = ($(this).attr("data-name"));

                  if ($("#defender").children().length === 0) {
                      renderCharacters(name, "#defender");
                      $(this).hide();
                      renderMessage("clearMessage");
                  }
              });
          }

          if (areaRender === "#defender") {
              $(areaRender).empty();
              for (var i = 0; i < combatants.length; i++) {
                  if(combatants[i].name === charObj) {
                      renderOne(combatants[i], areaRender, "defender");
                  }
              }
          }

          if (areaRender === "playerDamage") {
              $("#defender").empty();
              renderOne(charObj, "#defender", "defender");
          }
          if (areaRender === "enemyDamage") {
              $("#selected-character").empty();
              renderOne(charObj, "#selected-character", "");
          }
          if (areaRender === "enemyDefeated") {
              $("#defender").empty();
              var gameStateMessage = "You have defeated " + charObj.name + ", you can choose to fight another enemy";
              renderMessage(gameStateMessage);
          }
      };

      var restartGame = function(inputEndGame) {
          var restart = $("<button>Restart</button>").click(function() {
              location.reload();
          });

          var gameState = $("<div>").text(inputEndGame);

          $("body").append(gameState);
          $("body").append(restart);
      };

      renderCharacters(characters, "#characters-section");

      $(document).on("click", ".character", function() {
          var name = $(this).attr("data-name");
          if (!currSelectionCharacter) {
              currSelectionCharacter = characters[name];
              for (var key in characters) {
                  if (key !== characters) {
                      combatants.push(characters[key]);
                  }
              }

            $("#character-section").hide();

            renderCharacters(currSelectionCharacter, "#selected-character");
            renderCharacters(combatants, "available-to-attack-section");
          }
      });

      $("#attack-button").on("click", function() {
          ($("#defender").children().length !== 0) {
              var attackMessage = "You attacked " + currDefender.name + "for " + (currSelectionCharacter.attack * turnCounter) + " damage.";
              var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemyAttackBack + " damage.";
              renderMessage("clearMessage");
              currDefender.health -= (currSelectionCharacter.attack * turnCounter);
              if (currDefender.health > 0) {
                  renderCharacters(currDefender, "playerDamage");
                  renderMessage(attackMessage);
                  renderMessage(counterAttackMessage);
                  currSelectionCharacter.health -= currDefender.enemyAttackBack;
                  renderCharacters(currSelectionCharacter, "enemyDamage");
              }
          

          else {
              renderCharacters(currDefender, "enemyDefeated");
              killCount++;
              if (killCount >= 3) {
                  renderMessage("clearMessage");
                  restartGame("You won!!! Game Over!");
              }
          }
          }
          turnCounter++;
      });
});