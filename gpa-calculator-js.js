//this library is created to be used for gpa calculation in semester system
//Refer to README.md for usage instructions
(function (global) {
  var subject = [];
  var total_CH = 0;
  var gpa = 0.0;
  global.resultPrecision = 5;

  function getGrade(marks) {
    if (marks < 50) {
      return 0;
    } else if (marks < 55) {
      return 1.0;
    } else if (marks < 58) {
      return 1.7;
    } else if (marks < 61) {
      return 2.0;
    } else if (marks < 65) {
      return 2.3;
    } else if (marks < 70) {
      return 2.7;
    } else if (marks < 75) {
      return 3.0;
    } else if (marks < 80) {
      return 3.3;
    } else if (marks < 85) {
      return 3.7;
    } else {
      return 4.0;
    }
  }

  function reportError() {
    //provide element #validation_report for this
    document.querySelector("#validation_report").innerHTML =
      "Invalid Subject Entry!\n";
  }

  global.addSubject = function (marksOutOf_100, creditHour) {
    subject.push({
      marksOutOf_100,
      creditHour,
    });
    total_CH = total_CH + creditHour;
  };

  global.calculateGPA_viaDOM = function () {
    //result will be supplied by DOM #current_gpa_result
    if (!subject.length || !total_CH) {
      document.querySelector("#current_gpa_result").innerHTML = "0";
    } else {
      var subTotal = 0;
      for (const s of subject) {
        subTotal = subTotal + getGrade(s.marksOutOf_100) * s.creditHour;
      }
      gpa = subTotal / total_CH;
    }
    document.querySelector("#current_gpa_result").innerHTML = gpa.toPrecision(
      resultPrecision
    );
  };

  global.calculateGPA_viaValue = function () {
    //result will be supplied by return value
    if (!subject.length || !total_CH) {
      return 0;
    } else {
      var subTotal = 0;
      for (const s of subject) {
        subTotal = subTotal + getGrade(s.marksOutOf_100) * s.creditHour;
      }
      gpa = subTotal / total_CH;
    }
    return gpa.toPrecision(resultPrecision);
  };

  global.resetGPA_app = function () {
    //this will reset all the existing data
    subject = [];
    total_CH = 0;
    gpa = 0.0;
    document.querySelector("#current_gpa_result").innerHTML = "";
    document.querySelector("#validation_report").innerHTML = "";
  };
})(window);
