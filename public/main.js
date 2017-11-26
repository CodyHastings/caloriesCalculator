$(document).ready(function() {

  $("#submit").click(main);


  function main(){
    var inputCalories = $("#calories").val();
    var inputCarbs = $("#carbs").val();
    var inputProteins = $("#proteins").val();
    var inputFats = $("#fats").val();
    
    var carbPercent = calculateInputs(inputCalories, inputCarbs);
    var proteinPercent = calculateInputs(inputCalories, inputProteins);
    var fatsPercent = calculateInputs(inputCalories, inputFats);

    console.log(carbPercent + " " + proteinPercent + " " + fatsPercent);

    var targetCarbs = getTarget(inputCalories, .45);
    var targetProteins = getTarget(inputCalories, .35);
    var targetFats = getTarget(inputCalories, .2);

    console.log(targetCarbs + " " + targetProteins + " " + targetFats);

    var carbsResult = compare(targetCarbs, inputCarbs);
    var proteinsResult = compare(targetProteins, inputProteins);
    var fatsResult = compare(targetFats, inputFats);

    console.log(carbsResult + " " + proteinsResult + " " + fatsResult);

  }


  function calculateInputs(total, value){

    return value / total;

  }

  function getTarget(total, targetPercent){

    return total * targetPercent;

  }

  function compare(expected, actual){

    if(expected === actual){

        return "Perfect";

    } else if (expected < actual){

        return "Surplus";

    }

    return "Deficit";

  }

  var canvas = document.querySelector("canvas");
  var c = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener("resize", function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
          
    });

 
  function Bar() {
    

    this.update = function() {

      
      
      this.draw();
    };



    this.draw = function() {
      
     
    }
  }

  var barArray = [];
  function init() {
    
    barArray.push(new Bar()); 

  }

  function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth , innerHeight);

    for (var i = 0; i < barArray.length; i++) {
      barArray[i].update();

    }
  

  }
      
  animate();


});