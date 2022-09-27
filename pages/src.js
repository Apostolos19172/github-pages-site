"use strict";

google.charts.load("current", { packages: ["line"] });

var chart_divs = window.document.getElementsByClassName("chart_div");
var together = window.document.getElementsByClassName("together");

var width = window.screen.width;
initialize();

window.document
  .getElementById("codingNRZ-L")
  .addEventListener("click", codingNRZ_L);
window.document
  .getElementById("codingNRZ-I")
  .addEventListener("click", codingNRZ_I);
window.document
  .getElementById("codingAMI")
  .addEventListener("click", codingAMI);
window.document
  .getElementById("codingPseudoternary")
  .addEventListener("click", codingPseudoternary);
window.document
  .getElementById("codingManchester")
  .addEventListener("click", codingManchester);
window.document
  .getElementById("codingManchesterDifferential")
  .addEventListener("click", codingManchesterDifferential);
window.document
  .getElementById("deleteResults")
  .addEventListener("click", clearResults);
window.document
  .getElementById("deleteFields")
  .addEventListener("click", clearFields);
window.document.getElementById("printAll").addEventListener("click", printAll);
var inputs = window.document.querySelectorAll("input");
for (var input of inputs)
  input.addEventListener("focusin", function () {
    clearResults();
  });
for (var input of inputs)
  input.addEventListener("focusout", function () {
    checkValues();
  });

//"αρχικοποίηση" σελίδας, ενδεικτικές τιμές σε μονάδες μέτρησης και πεδία
function initialize() {
  window.document.getElementById("n").value = 8;
  window.document.getElementById("sequence").value = "01001110";
}

//συνάρτηση επιστροφής των δεδομένων των απαραίτητων για τους υπολογισμούς από τα πεδία στην html σαν array
function getData() {
  var n = parseFloat(
    parseFloat(window.document.getElementById("n").value).toFixed(2)
  );
  var sequence = window.document.getElementById("sequence").value;

  var data = [n, sequence];

  return data;
}

//έλεγχος ορθής συμπλήρωσης των πεδίων
function checkValues() {
  var data = getData();

  var n = data[0];
  var sequence = data[1];
  var order = window.document.getElementById("order");
  var scrollInto = window.document.getElementById("scrollInto");

  var correct = true;
  if (sequence.length > n) {
    order.innerHTML =
      "Έδωσες μεγαλύτερη ακολουθία από το πλήθος των bits. Διόρθωσε τα πεδία.";
    correct = false;
    scrollInto.scrollIntoView();
  } else if (sequence.length < n) {
    order.innerHTML =
      "Έδωσες μεγαλύτερο αριθμό bits από ότι είναι η ακολουθία. Διόρθωσε τα πεδία.";
    correct = false;
    scrollInto.scrollIntoView();
  }

  return correct;
}

//συνάρτηση εμφάνισης όλων των αποτελεσμάτων
function printAll() {
  clearResults();
  if (checkValues()) {
    window.document.getElementById("codingNRZ-L").click();
    window.document.getElementById("codingNRZ-I").click();
    window.document.getElementById("codingAMI").click();
    window.document.getElementById("codingPseudoternary").click();
    window.document.getElementById("codingManchester").click();
    window.document.getElementById("codingManchesterDifferential").click();
  }
}

//συνάρτηση κωδικοποίησης NRZ_L
function codingNRZ_L() {
  clearResultsForOneCalculation(chart_divs[0], together[0]);
  if (checkValues()) {
    var data = getData();

    var n = data[0];
    var sequence = data[1];

    var end = n * 10.0;
    var x = [];
    var y = [];
    var up = [];
    var down = [];

    for (var i = 1; i <= n; i++) {
      var temp0 = i * 10;
      var temp1 = i * 10 + 10;
      var currentBit = sequence[i - 1];
      for (var j = temp0; j <= temp1; j += 1) {
        up.push(2);
        down.push(-2);
        x.push(j);

        if (currentBit.localeCompare("0") == 0) y.push(1);
        else y.push(-1);
      }
    }

    var widthOfGraph = width - 300;
    var widthOfSmallGraph = 400;
    var heightOfGraph = 600;
    if (width <= 500) {
      widthOfGraph = 300;
      widthOfSmallGraph = 300;
      heightOfGraph = 400;
    }

    together[0].style.border = "5px solid yellow";
    drawChartWith3Lines(
      widthOfGraph,
      heightOfGraph,
      chart_divs[0],
      "brown",
      "NRZ-L",
      sequence,
      x,
      y,
      up,
      down,
      "κωδικοποιημένο σήμα"
    );
    drawChartWith3Lines(
      widthOfSmallGraph,
      200,
      together[0],
      "brown",
      "NRZ-L: " + sequence,
      "",
      x,
      y,
      up,
      down,
      ""
    );
  }
}

//συνάρτηση κωδικοποίησης NRZ_I
function codingNRZ_I() {
  clearResultsForOneCalculation(chart_divs[1], together[1]);
  if (checkValues()) {
    var data = getData();

    var n = data[0];
    var sequence = data[1];

    var end = n * 10.0;
    var x = [];
    var y = [];
    var up = [];
    var down = [];
    var previousY = 1;

    for (var i = 1; i <= n; i++) {
      var temp0 = i * 10;
      var temp1 = i * 10 + 10;
      var temp = previousY;
      var currentBit = sequence[i - 1];
      for (var j = temp0; j <= temp1; j += 1) {
        up.push(2);
        down.push(-2);
        x.push(j);

        if (currentBit.localeCompare("1") == 0) {
          temp = -1 * previousY;
          y.push(temp);
        } else {
          y.push(previousY);
        }
      }
      previousY = temp;
    }

    var widthOfGraph = width - 300;
    var widthOfSmallGraph = 400;
    var heightOfGraph = 600;
    if (width <= 500) {
      widthOfGraph = 300;
      var widthOfSmallGraph = 300;
      heightOfGraph = 400;
    }

    together[1].style.border = "5px solid yellow";
    drawChartWith3Lines(
      widthOfGraph,
      heightOfGraph,
      chart_divs[1],
      "purple",
      "NRZ-I",
      sequence,
      x,
      y,
      up,
      down,
      "κωδικοποιημένο σήμα"
    );
    drawChartWith3Lines(
      widthOfSmallGraph,
      200,
      together[1],
      "purple",
      "NRZ-I: " + sequence,
      "",
      x,
      y,
      up,
      down,
      ""
    );
  }
}

//συνάρτηση κωδικοποίησης AMI
function codingAMI() {
  clearResultsForOneCalculation(chart_divs[2], together[2]);
  if (checkValues()) {
    var data = getData();

    var n = data[0];
    var sequence = data[1];

    var end = n * 10.0;
    var x = [];
    var y = [];
    var up = [];
    var down = [];
    var previous1 = 1;

    for (var i = 1; i <= n; i++) {
      var temp0 = i * 10;
      var temp1 = i * 10 + 10;

      var temp = previous1;
      var currentBit = sequence[i - 1];
      for (var j = temp0; j <= temp1; j += 1) {
        up.push(2);
        down.push(-2);
        x.push(j);

        if (currentBit.localeCompare("0") == 0) {
          y.push(0);
        } else {
          if (previous1 == 1) {
            y.push(-1);
            temp = -1;
          } else {
            y.push(1);
            temp = 1;
          }
        }
      }
      previous1 = temp;
    }

    var widthOfGraph = width - 300;
    var widthOfSmallGraph = 400;
    var heightOfGraph = 600;
    if (width <= 500) {
      widthOfGraph = 300;
      widthOfSmallGraph = 300;
      heightOfGraph = 400;
    }

    together[2].style.border = "5px solid yellow";
    drawChartWith3Lines(
      widthOfGraph,
      heightOfGraph,
      chart_divs[2],
      "green",
      "AMI",
      sequence,
      x,
      y,
      up,
      down,
      "κωδικοποιημένο σήμα"
    );
    drawChartWith3Lines(
      widthOfSmallGraph,
      200,
      together[2],
      "green",
      "AMI: " + sequence,
      "",
      x,
      y,
      up,
      down,
      ""
    );
  }
}

//συνάρτηση κωδικοποίησης Pseudoternary
function codingPseudoternary() {
  clearResultsForOneCalculation(chart_divs[3], together[3]);
  if (checkValues()) {
    var data = getData();

    var n = data[0];
    var sequence = data[1];

    var end = n * 10.0;
    var x = [];
    var y = [];
    var up = [];
    var down = [];
    var previous0 = 1;

    for (var i = 1; i <= n; i++) {
      var temp0 = i * 10;
      var temp1 = i * 10 + 10;

      var temp = previous0;
      var currentBit = sequence[i - 1];
      for (var j = temp0; j <= temp1; j += 1) {
        up.push(2);
        down.push(-2);
        x.push(j);

        if (currentBit.localeCompare("1") == 0) {
          y.push(0);
        } else {
          if (previous0 == 1) {
            y.push(-1);
            temp = -1;
          } else {
            y.push(1);
            temp = 1;
          }
        }
      }
      previous0 = temp;
    }

    var widthOfGraph = width - 300;
    var widthOfSmallGraph = 400;
    var heightOfGraph = 600;
    if (width <= 500) {
      widthOfGraph = 300;
      widthOfSmallGraph = 300;
      heightOfGraph = 400;
    }

    together[3].style.border = "5px solid yellow";
    drawChartWith3Lines(
      widthOfGraph,
      heightOfGraph,
      chart_divs[3],
      "orange",
      "Pseudoternary",
      sequence,
      x,
      y,
      up,
      down,
      "κωδικοποιημένο σήμα"
    );
    drawChartWith3Lines(
      widthOfSmallGraph,
      200,
      together[3],
      "orange",
      "Pseudoternary: " + sequence,
      "",
      x,
      y,
      up,
      down,
      ""
    );
  }
}

//συνάρτηση κωδικοποίησης Manchester
function codingManchester() {
  clearResultsForOneCalculation(chart_divs[4], together[4]);
  if (checkValues()) {
    var data = getData();

    var n = data[0];
    var sequence = data[1];

    var end = n * 10.0;
    var x = [];
    var y = [];
    var up = [];
    var down = [];

    for (var i = 1; i <= n; i++) {
      var temp0 = i * 10;
      var temp1 = i * 10 + 10;

      var previousV;
      var currentBit = sequence[i - 1];
      for (var j = temp0; j <= temp1 - 5; j += 1) {
        up.push(2);
        down.push(-2);
        x.push(j);

        if (currentBit.localeCompare("1") == 0) {
          y.push(-1);
          previousV = -1;
        } else {
          y.push(1);
          previousV = 1;
        }
      }
      for (var j = temp1 - 5; j <= temp1; j += 1) {
        up.push(2);
        down.push(-2);
        x.push(j);
        var V = -1 * previousV;
        y.push(V);
      }
    }

    var widthOfGraph = width - 300;
    var widthOfSmallGraph = 400;
    var heightOfGraph = 600;
    if (width <= 500) {
      widthOfGraph = 300;
      widthOfSmallGraph = 300;
      heightOfGraph = 400;
    }

    together[4].style.border = "5px solid yellow";
    drawChartWith3Lines(
      widthOfGraph,
      heightOfGraph,
      chart_divs[4],
      "black",
      "Manchester",
      sequence,
      x,
      y,
      up,
      down,
      "κωδικοποιημένο σήμα"
    );
    drawChartWith3Lines(
      widthOfSmallGraph,
      200,
      together[4],
      "black",
      "Manchester: " + sequence,
      "",
      x,
      y,
      up,
      down,
      ""
    );
  }
}

//συνάρτηση κωδικοποίησης ManchesterDifferential
function codingManchesterDifferential() {
  clearResultsForOneCalculation(chart_divs[5], together[5]);
  if (checkValues()) {
    var data = getData();

    var n = data[0];
    var sequence = data[1];

    var end = n * 10.0;
    var x = [];
    var y = [];
    var up = [];
    var down = [];
    var realPreviousV = 1;

    for (var i = 1; i <= n; i++) {
      var temp0 = i * 10;
      var temp1 = i * 10 + 10;

      var temp = realPreviousV;
      var previousV;
      var currentBit = sequence[i - 1];
      for (var j = temp0; j <= temp1 - 5; j += 1) {
        up.push(2);
        down.push(-2);
        x.push(j);

        if (currentBit.localeCompare("0") == 0) {
          var v = -1 * temp;
          y.push(v);
          previousV = v;
        } else {
          y.push(temp);
          previousV = temp;
        }
      }
      for (var j = temp1 - 5; j <= temp1; j += 1) {
        up.push(2);
        down.push(-2);
        x.push(j);
        var V = -1 * previousV;
        y.push(V);
        temp = V;
      }
      realPreviousV = temp;
    }

    var widthOfGraph = width - 300;
    var widthOfSmallGraph = 400;
    var heightOfGraph = 600;
    if (width <= 500) {
      widthOfGraph = 300;
      widthOfSmallGraph = 300;
      heightOfGraph = 400;
    }

    together[5].style.border = "5px solid yellow";
    drawChartWith3Lines(
      widthOfGraph,
      heightOfGraph,
      chart_divs[5],
      "pink",
      "Διαφορική Manchester",
      sequence,
      x,
      y,
      up,
      down,
      "κωδικοποιημένο σήμα"
    );
    drawChartWith3Lines(
      widthOfSmallGraph,
      200,
      together[5],
      "pink",
      "Διαφορική Manchester: " + sequence,
      "",
      x,
      y,
      up,
      down,
      ""
    );
  }
}

//συνάρτηση απεικόνισης πολλαπλών γραμμών (3) στο ίδιο διάγραμμα
function drawChartWith3Lines(
  widthOfGraph,
  heightOfGraph,
  div,
  color,
  title,
  subtitle,
  x,
  line1,
  line2,
  line3,
  info
) {
  var data = new google.visualization.DataTable();
  data.addColumn("number", "χρόνος");
  data.addColumn("number", info);
  data.addColumn("number", "");
  data.addColumn("number", "");
  data.addColumn("number", "");

  var lengthOfBit = [];
  for (var i = 0; i <= 10; i++) lengthOfBit.push(1.5);
  var table = [];
  for (var i = 0; i < line1.length; i++) {
    var resultsForOneValue = [
      x[i],
      line1[i],
      line2[i],
      line3[i],
      lengthOfBit[i],
    ];
    table.push(resultsForOneValue);
  }

  data.addRows(table);

  var options = {
    chart: {
      title: title,
      subtitle: subtitle,
    },
    width: widthOfGraph,
    height: heightOfGraph,
    series: {
      0: { color: color },
      1: { color: "gray" },
      2: { color: "gray" },
      3: { color: "blue" },
    },
  };

  var chart = new google.charts.Line(div);
  chart.draw(data, google.charts.Line.convertOptions(options));
}

//συνάρτηση καθαρισμού αποτελέσματος
function clearResultsForOneCalculation(chart_div, together_div) {
  chart_div.innerHTML = "";
  together_div.innerHTML = "";
  together_div.style.border = "5px solid transparent";
}

//συνάρτηση καθαρισμού αποτελεσμάτων
function clearResults() {
  var order = window.document.getElementById("order");
  order.innerHTML = "";

  for (var div of together) {
    div.innerHTML = "";
    div.style.border = "";
  }

  for (var div of chart_divs) div.innerHTML = "";
}

//επαναφορά των πεδίων στις αρχικές τους τιμές
function clearFields() {
  window.location.reload();
  clearResults();
}
