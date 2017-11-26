$(document).ready(function() {
  var targetBarCount = 0;
  var barCount = 0;
  var margin = 20;
  var startX = 5;
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

    init(carbsResult);
    init(proteinsResult);
    init(fatsResult);
    init(targetCarbs);
    init(targetProteins);
    init(targetFats);

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

    if(expected === actual){

        
        return "perfect";

    } else if (expected < actual){
        
        return "surplus";

    }
   
    return "deficit";

  }


 
  function Bar(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;


    this.update = function() {
      
      if (this.y != 0 && this.y <= canvas.height){
        this.y -= 1;
        this.height += 1;
      }
      
      
      this.draw();
    };



    this.draw = function() {
      

      c.fillStyle=this.color;
      c.fillRect(this.x, this.y, this.width, this.height);

     
    }
  }

  var barArray = [];
  function init(check) {
      var color = "black";
      var height = 0;
      var width = canvas.width / 20;
    // if check is a number init a target bar
    if($.isNumeric(check)){
      targetBarCount += 1
      switch(targetBarCount){
        case 1:
          var x = (startX + width) * 4;
          var y = canvas.height - 5;
        break;
        case 2:
          var x = (startX + width) * 6;
          var y = canvas.height - 5;
        break;
        case 3:
          var x = (startX + width) * 8;
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
    var width = canvas.width / 20;
    var height = 0;
    switch(barCount){
        case 1:
          var x = (startX + width);
          var y = canvas.height - 5;
        break;
        case 2:
          var x = (startX + width) * 5;
          var y = canvas.height - 5;
        break;
        case 3:
          var x = (startX + width) * 7;
          var y = canvas.height - 5;
        break;
      }
      
    barArray.push(new Bar(x, y, width, height, color)); 

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