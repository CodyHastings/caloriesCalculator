$(document).ready(function() {
  var targetBarCount = 0;
  var barCount = 0;
  var margin = 20;
  var canvas = document.querySelector("canvas");
  var c = canvas.getContext("2d");
  canvas.width = $("#canvasContainer").innerWidth();
  canvas.height = $("#canvasContainer").innerHeight();
  window.addEventListener("resize", function() {
      canvas.width = $("#canvasContainer").innerWidth();
      canvas.height = $("#canvasContainer").innerHeight();
          
    });

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

    // input bars
    init(carbsResult, inputCarbs);
    init(proteinsResult, inputProteins);
    init(fatsResult, inputFats);

    // target bars
    init(targetCarbs, targetCarbs);
    init(targetProteins, targetProteins);
    init(targetFats, targetFats);

    console.log(carbsResult + " " + proteinsResult + " " + fatsResult);
    console.log(barArray);

  }


  function calculateInputs(total, value){

    return value / total;

  }

  function getTarget(total, targetPercent){

    return total * targetPercent;

  }

  function compare(expected, actual){

    if(expected == actual){

        
        return "perfect";

    } else if (expected < actual){
        
        return "surplus";

    }
   
    return "deficit";

  }


 
  function Bar(x, y, width, height, color, maxHeight, counter) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.maxHeight = maxHeight / 4;
    this.counter = counter;


    this.update = function() {
      
      if (this.counter != this.maxHeight && this.y <= canvas.height){
        this.y -= 1;
        this.height += 1;
        this.counter += 1;
      }
      
      
      this.draw();
    };



    this.draw = function() {
      

      c.fillStyle=this.color;
      c.fillRect(this.x, this.y, this.width, this.height);
      c.font="20px Georgia";

      c.strokeRect(0, 0, 100, 100);
      c.fillStyle="green";
      c.fillRect(5, 20, 10, 10);
      c.fillStyle="blue";
      c.fillRect(5, 40, 10, 10);
      c.fillStyle="red";
      c.fillRect(5, 60, 10, 10);

      c.fillText("Perfect", 10, 20);
      c.fillText("Deficit", 10, 40);
      c.fillText("Surplus", 10, 60);

     
    }
  }

  var barArray = [];
  function init(check, maxHeight) {
      var color = "black";
      var height = 0;
      var width = canvas.width / 20;
      var startX = 50 + width;
      var counter = 0;
    // if check is a number init a target bar
    if($.isNumeric(check)){
      targetBarCount += 1
      switch(targetBarCount){
        case 1:
          var x = startX * 2;
          var y = canvas.height - 5;
        break;
        case 2:
          var x = startX * 4;
          var y = canvas.height - 5;
        break;
        case 3:
          var x = startX * 6;
          var y = canvas.height - 5;
        break;
      }
 

    }
    switch(check){
      case "perfect":
        var color = "green";
      break;

      case "surplus":
        var color = "red";
      break;

      case "deficit":
        var color = "blue";
      break;

    }
    barCount += 1
    switch(barCount){
        case 1:
          var x = startX;
          var y = canvas.height - 5;
        break;
        case 2:
          var x = (startX * 2) + startX;
          var y = canvas.height - 5;
        break;
        case 3:
          var x = (startX * 4) + startX;
          var y = canvas.height - 5;
        break;
      }
      
    barArray.push(new Bar(x, y, width, height, color, maxHeight, counter)); 

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