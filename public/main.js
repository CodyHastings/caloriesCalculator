$(document).ready(function() {

  $("#submit").click(getInputs);

  function getInputs(){
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

});