$(document).ready(function() {
  
  var sequenceString = "";
  var currNumString = "0";
  
  var sequenceDisplay = document.getElementById("displayTextSequence");
  var mainDisplay = document.getElementById("displayTextMain");
  
  var justCalculated = false;
  
  // User presses a number button
  $(".numButton").click(function() {
    // Clear previous calculation
    if (justCalculated) {
      currNumString = this.innerHTML;
      justCalculated = false;
    }
    else
    // New number
    if (currNumString == "0") {
      currNumString = this.innerHTML;
    }
    // Continue entering number
    else if (currNumString.length < 9) {
      currNumString += this.innerHTML;
    }
    mainDisplay.innerHTML = currNumString;
  });
  
  // User presses an operation button
  $(".operButton").click(function() {
    switch(this.innerHTML) {
      case "CE":
        // Clear current number only
        currNumString = "0";
        mainDisplay.innerHTML = currNumString;
        break;
      case "C":
        // Clear current number and sequence
        sequenceString = "";
        currNumString = "0";
        sequenceDisplay.innerHTML = "";
        mainDisplay.innerHTML = currNumString;
        break;
      case "del":
        // Delete most recent character (digit lowest in decimal place)
        var lowerLimit = 1;
        if (/\-/.test(currNumString) == true) {
          lowerLimit = 2;
        }
        if (currNumString.length > lowerLimit) {
          currNumString = currNumString.substring(0, currNumString.length-1);
          mainDisplay.innerHTML = currNumString;
        }
        else {
          currNumString = 0;
          mainDisplay.innerHTML = currNumString;
        }
        break;
      case "neg":
        // Switch current number between positive and negative
        if (/\-/.test(currNumString) == false) {
          currNumString = "-" + currNumString;
        }
        else {
          currNumString = currNumString.substring(1);
        }
        mainDisplay.innerHTML = currNumString;
        break;
      case ".":
        // Add a decimal if there isn't one already
        if (/\./.test(currNumString) == false) {
          currNumString += ".";
          mainDisplay.innerHTML = currNumString;
        }
        break;
      case "=":
        // Run calculation (Last thing to do! Woah!);
        sequenceString += currNumString;
        // Get pieces of calculation (numbers and operations)
        var calculationPieces = sequenceString.split(" ");
        
        var result = 0;
        var nextOperation = "";
        // Perform calculation using pieces
        for (var i = 0; i < calculationPieces.length; i += 2) {
          var parsedNum = parseFloat(calculationPieces[i]);
          
          if (parsedNum != NaN) {
            // Number
            if (i == 0) {
              // First number in sequence
              result = parsedNum;
            }
            else {
              // All other numbers in sequence
              // Get operation
              switch(calculationPieces[i-1]) {
                case "+":
                  result += parsedNum;
                  break;
                case "-":
                  result -= parsedNum;
                  break;
                case "*":
                  result *= parsedNum;
                  break;
                case "/":
                  result /= parsedNum;
                  break;
              }
            }              
          }
        }
        
        var resultString = result.toString();

                
        // Shorten decimal if needed
        if (resultString.length > 9 && /\./.test(resultString)) {
          for (var i = resultString.length; i >= 0; i--) {
            var fixed = result.toFixed(i);
            if (fixed.length <= 9) {
              resultString = fixed;
              break;
            }
          }
        }
        // Return error if number is just too large
        if (resultString.length > 9) {
          resultString = "TOO BIG";
        }
        
        // Output result
        justCalculated = true;
        sequenceString = "";
        sequenceDisplay.innerHTML = "";
        currNumString = resultString;
        mainDisplay.innerHTML = currNumString;
        break; 
      case "+":
      case "-":
      case "*":
      case "/":
      default:
        // Default
        if (!isNaN(currNumString)) {
          sequenceString += currNumString;
          currNumString = "0";
          sequenceString += " " + this.innerHTML + " ";
          mainDisplay.innerHTML = currNumString;
          sequenceDisplay.innerHTML = sequenceString;
        }
    }
  });
  
});