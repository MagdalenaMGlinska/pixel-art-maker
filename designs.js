// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

const COLOR_PICKER = $('#colorPicker'); // Select color input
const INPUT_HEIGHT = $('#input_height'); // Select height input
const INPUT_WIDTH = $('#input_width'); // Select width input
const CANVAS = $('#pixel_canvas'); // Select design canvas
const GRID_SIZE = $('#sizePicker'); // Select size input
let mouseDraggingLeft = false; // Set the mouse left button dragging status
let mouseDraggingRight = false; // Set the mouse right button dragging status


// Function set de size of the cross stitch canvas as an N by M grid
function makeGrid() {
  let gridHeight = INPUT_HEIGHT.val();
  let gridWidth = INPUT_WIDTH.val();

  CANVAS.empty(); //clear the canvas

  // Make <tr></tr> elements
  for (let i = 1; i <= gridHeight; i++) {
    CANVAS.append('<tr></tr>');
  }

  // Make <td></td> elements
  let j = 1;
  while ( j <= gridWidth ) {
    let trElem = $('tr'); // Select <tr></tr> element
    trElem.append('<td></td>');
    j++;
  }

  // Change the border-color and style for hovered td element
  $( 'td' ).hover( function() {
      $( this ).addClass('td-hover');
    }, function() {
      $( this ).removeClass('td-hover');
    }
  );
}

// Function change td element background
function changeCellBackground(tdCurrent) {
  let selectedColor = COLOR_PICKER.val();
  tdCurrent.css( 'background-color', selectedColor);
  $( 'h1' ).css( 'color', selectedColor);
}

// Make default canvas
$( function() {
  makeGrid();
});

// Make the submitted canvas
GRID_SIZE.submit( function(event) {
  event.preventDefault();
  makeGrid();
});

// Change the cell background and title color
CANVAS.on('click', 'td', function() {
    changeCellBackground($( this ));
});

// Clear the cell background
CANVAS.on('dblclick', 'td', function() {
  $( this ).css( 'background-color', 'white');
});

 // Disable context menu on document
$('*').contextmenu( function() {
  return false;
});

// Change the cell background and title color when dragging mouse buttons
CANVAS.on('mousedown', 'td', function(event) {
  event.preventDefault();
  if (event.which === 1) {
    mouseDraggingLeft = true;
  } else if (event.which === 3) {
    mouseDraggingRight = true;
  } else {
    alert('The middle button can not be use!');
  }
});

CANVAS.on('mouseup', function() {
  mouseDraggingLeft = false;
  mouseDraggingRight = false;
});

CANVAS.on('mouseleave', function() {
  mouseDraggingLeft = false;
  mouseDraggingRight = false;
});

CANVAS.on('mousemove', 'td', function() {
  if(mouseDraggingLeft === true) {
    changeCellBackground($( this ));
  } else if (mouseDraggingRight === true) {
    $( this ).css( 'background-color', 'white');
  }
});
