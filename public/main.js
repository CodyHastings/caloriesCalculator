$(document).ready(function() {
  var targetBarCount = 0;
  var barCount = 0;
  var margin = 20;
  var barArray = [];
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
    animate();

    console.log(barArray);
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

    var tCarbs = "targetCarbs";
    var tProteins = "targetProteins";
    var tFats = "targetFats";

    var iCarbs = "inputCarbs";
    var iProteins = "inputProteins";
    var iFats = "inputFats";
    // input bars
    init(carbsResult, inputCarbs, iCarbs);
    init(proteinsResult, inputProteins, iProteins);
    init(fatsResult, inputFats, iFats);

    // target bars
    init(targetCarbs, targetCarbs, tCarbs);
    init(targetProteins, targetProteins, tProteins);
    init(targetFats, targetFats, tFats);

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


 
  function Bar(x, y, width, height, color, maxHeight, counter, name, stats) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.maxHeight = maxHeight / 4;
    this.maxStats = maxHeight;
    this.stats = stats;
    this.counter = counter;
    this.name = name;
    this.flag = true;


    this.update = function() {
      
      if (this.counter != this.maxHeight && this.y <= canvas.height){
        this.y -= 1;
        this.height += 1;
        this.counter += 1;
      } else {
        this.flag = false;
      }

      if (this.flag && this.stats <= this.maxStats){
        this.stats += 2;

      } else if(!this.flag){
        this.stats = this.maxStats;
      }
      
      
      this.draw();
    };



    this.draw = function() {
      

      c.fillStyle=this.color;
      c.fillRect(this.x, this.y, this.width, this.height);
      c.font="12px Verdana";
      c.fillStyle="black";
      switch(this.name){
        case "targetCarbs":
          c.fillText("Target Carbs", this.x - 15, canvas.height - 5);
          c.fillText(this.stats, this.x, this.y - 2);
        break;
        case "targetProteins":
          c.fillText("Target Proteins", this.x - 20, canvas.height - 5);
          c.fillText(this.stats, this.x, this.y - 2);
        break;
        case "targetFats":
          c.fillText("Target Fats", this.x - 15, canvas.height - 5);
          c.fillText(this.stats, this.x, this.y - 2);
        break;
        case "inputCarbs":
          c.fillText("Carbs", this.x - 1, canvas.height - 5);
          c.fillText(this.stats, this.x, this.y - 2);
        break;
        case "inputProteins":
          c.fillText("Proteins", this.x -1, canvas.height - 5);
          c.fillText(this.stats, this.x, this.y - 2);
        break;
        case "inputFats":
          c.fillText("Fats", this.x, canvas.height - 5);
          c.fillText(this.counter, this.x, this.y - 2);
        break;
      }

    }
  }

  function initLegend(){
      c.font="20px Verdana";
      c.strokeRect(0, 0, 120, 100);
      c.fillStyle="green";
      c.fillRect(5, 20, 20, 20);
      c.fillStyle="blue";
      c.fillRect(5, 40, 20, 20);
      c.fillStyle="red";
      c.fillRect(5, 60, 20, 20);
      c.fillStyle="black";
      c.fillText("Perfect", 28, 38);
      c.fillText("Deficit", 28, 58);
      c.fillText("Surplus", 28, 78);
  }
  
  function init(check, maxHeight, name) {
      var color = "black";
      var height = 0;
      var width = canvas.width / 20;
      var startX = 50 + width;
      var counter = 0;
      var stats = 0;
    // if check is a number init a target bar
    if($.isNumeric(check)){
      targetBarCount += 1
      switch(targetBarCount){
        case 1:
          var x = startX * 2;
          var y = canvas.height - 20;
        break;
        case 2:
          var x = startX * 4;
          var y = canvas.height - 20;
        break;
        case 3:
          var x = startX * 6;
          var y = canvas.height - 20;
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
          var y = canvas.height - 20;
        break;
        case 2:
          var x = (startX * 2) + startX;
          var y = canvas.height - 20;
        break;
        case 3:
          var x = (startX * 4) + startX;
          var y = canvas.height - 20;
        break;
      }
      
    barArray.push(new Bar(x, y, width, height, color, maxHeight, counter, name, stats)); 

  }

  function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth , innerHeight);

    for (var i = 0; i < barArray.length; i++) {
      barArray[i].update();

    }
  initLegend()

  }
      


});