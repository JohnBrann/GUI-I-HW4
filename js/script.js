/*
File: script.js
GUI Assignment: Input validation with jQuery
John Brann, UMass Lowell Computer Science, john_brann@student.uml.edu
Copyright (c) 2024 by John. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
Created by JB on June 12, 2024 at 6:04 PM
*/

$(document).ready(function () {
  // validate the inputs
  inputValidation();
  // generate the sliders
  sliders();

  // when button is clicked generate the table
  $("#submit-button").on("click", function () {
    if ($("#form").valid()) {
      generateTable();
    }
  });
});

function inputValidation() {
  $('#form').validate({
    rules: {
      'rowLower': {
        required: true,
        number: true,
        min: -50, // minimum value of -50
        maxLowerRow: true 
      },
      'rowUpper': {
        required: true,
        number: true,
        max: 50,  // maximum value of 50
        minUpperRow: true
      },
      'colLower': {
        required: true,
        number: true,
        min: -50,
        maxLowerCol: true
      },
      'colUpper': {
        required: true,
        number: true,
        max: 50,
        minUpperCol: true
      }
    },
    messages: {
      'rowLower': {
        required: 'Please enter lower row bounds',
        number: 'Please enter a valid number for lower row bounds',
      },
      'rowUpper': {
        required: 'Please enter upper row bounds',
        number: 'Please enter a valid number for upper row bounds'
      },
      'colLower': {
        required: 'Please enter lower column bounds',
        number: 'Please enter a valid number for lower column bounds'
      },
      'colUpper': {
        required: 'Please enter upper column bounds',
        number: 'Please enter a valid number for upper column bounds'
      }
    },
  });

  // added custom validation methods for min and max ranges
  // https://jqueryvalidation.org/jQuery.validator.addMethod/
  // https://stackoverflow.com/questions/241145/jquery-validate-plugin-how-to-create-a-simple-custom-rule

  // custom method for lower row bound max to be less than upper row bound
  $.validator.addMethod("maxLowerRow", function(value, element) {
    var rowLower = $('#rowLower').val()
    var rowUpper = $('#rowUpper').val();
    return rowUpper === '' || (rowLower !== '' && rowLower < rowUpper);
  }, "The lower row bound must be less than the upper row bound, try a smaller number");

   // custom method for upper row bound max to be greater than lower row bound
  $.validator.addMethod("minUpperRow", function(value, element) {
    var rowLower = $('#rowLower').val();
    var rowUpper = $('#rowUpper').val();
    return rowLower === '' || (rowLower !== '' && rowUpper !== '' && rowLower < rowUpper);
  }, "The upper row bound must be greater than the lower row bound, try a larger number");

   // custom method for lower column bound max to be less than upper column bound
  $.validator.addMethod("maxLowerCol", function(value, element) {
    var colLower = $('#colLower').val();
    var colUpper = $('#colUpper').val();
    return colUpper === '' || (colUpper !== '' && colLower < colUpper);
  }, "The lower column bound must be less than the upper column bound, try a smaller number");

   // custom method for upper column bound min to be greater than lower column bound
  $.validator.addMethod("minUpperCol", function(value, element) {
    var colLower = $('#colLower').val();
    var colUpper = $('#colUpper').val();
    return colLower === '' || (colLower !== '' && colUpper !== '' && colLower < colUpper);
  }, "The upper column bound must be greater than the lower column bound, try a larger number!");
}

// generates each of the sliders and makes them in sync with the text
// https://www.javatpoint.com/jquery-ui-slider
function sliders() {
  // row lower bound slider
  $('#slider1').slider({
    min: -50,
    max: 49,
    range: [-50, 49], // ranges fro slider
    value: 0, // starting value

    slide: function(event, sliderData) {
      $("#rowLower").val(sliderData.value);
      $(this).find('.ui-slider-handle').text(sliderData.value);
    },
    create: function(event, sliderData) {
      var val = $(this).slider('value');
      $(this).find('.ui-slider-handle').text(val);
    }
  });

  // row upper bound slider
  $('#slider2').slider({
    min: -49,
    max: 50,
    range: [-49, 50],
    value: 0,

    slide: function(event, sliderData) {
      $("#rowUpper").val(sliderData.value);
      $(this).find('.ui-slider-handle').text(sliderData.value);
      // submit form
    },
    create: function(event, sliderData) {
      var val = $(this).slider('value');
      $(this).find('.ui-slider-handle').text(val);
    }
  });

  // column lower bound slider
  $('#slider3').slider({
    min: -50,
    max: 49,
    range: [-50, 49],
    value: 0,

    slide: function(event, sliderData) {
      $("#colLower").val(sliderData.value);
      $(this).find('.ui-slider-handle').text(sliderData.value);
    },
    create: function(event, sliderData) {
      var val = $(this).slider('value');
      $(this).find('.ui-slider-handle').text(val);
    }
  });

  // column upper bound slider
  $('#slider4').slider({
    min: -49,
    max: 50,
    range: [-49, 50],
    value: 0,

    slide: function(event, sliderData) {
      $("#colUpper").val(sliderData.value);
      $(this).find('.ui-slider-handle').text(sliderData.value);

    },
    create: function(event, sliderData) {
      var val = $(this).slider('value');
      $(this).find('.ui-slider-handle').text(val);
    }
  });

  // updates sliders when the a number is put in the text field
  $('#rowLower').on('input', function() {
    $('#slider1').slider('value', $(this).val());
  });

  $('#rowUpper').on('input', function() {
    $('#slider2').slider('value', $(this).val());
  });

  $('#colLower').on('input', function() {
    $('#slider3').slider('value', $(this).val());
  });

  $('#colUpper').on('input', function() {
    $('#slider4').slider('value', $(this).val());
  }); // slider button is updating but the text on the slider is not

}

// This function creates the table
function generateTable() {
  // Create table
  const table = document.getElementById('table');

  const rowLower = document.getElementById('rowLower');
  const rowUpper = document.getElementById('rowUpper');
  const colLower = document.getElementById('colLower');
  const colUpper = document.getElementById('colUpper');

  // Clear table regardless if there is anything there
  table.textContent = '';

  // Initialize helper variables
  var row_val = Number(rowLower.value);
  var col_val = Number(colLower.value);

  // First row
  let firstRow = table.insertRow();
  // Rest of the row
  for (var col = 0; col < (colUpper.value - colLower.value) + 2; col++) { // +2 is for header and +1 for last row
    let cell = firstRow.insertCell();
    if (col === 0) { // First row blank box
      cell.textContent = "";
    } else {
      cell.textContent = col_val;
      col_val++;
    }
  }

  col_val = Number(colLower.value);

  // Create the rows then columns first
  for (var row = 1; row < (rowUpper.value - rowLower.value) + 2; row++) { // +2 is for header and +1 for last row
    let curr_row = table.insertRow();

    for (var col = 0; col < (colUpper.value - colLower.value) + 2; col++) {
      let curr_col = curr_row.insertCell();
      if (col === 0) { // "header"
        curr_col.textContent = row_val; // Updates which row we are on
      } else {
        curr_col.textContent = row_val * col_val; // Math for results of multiplication
        col_val++;
      }
    }

    col_val = Number(colLower.value);
    row_val++;
  }
}
