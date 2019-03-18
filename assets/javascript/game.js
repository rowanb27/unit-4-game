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

      var renderOne = function(character, renderArea, charStatus) {
          var charDiv = $("<div class='character' data-name'" + character.name + "'>");
          var charName = $("<div class='character-name'>").text(character.name);
          var charImage = $("<img atl='image' class='character-image'>").attr("src", character.imageUrl);
          charDiv.append(charName).append(charImage).append(charHealth);
          $(renderArea).append(charDiv);

          if (charStatus === "enemy") {
              $(charDiv).addClass("enemy");
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
                  }
              });
          }
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
});