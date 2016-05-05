## Synopsis

My simple online quiz idea. It is mostly a mockup of what it could look like and how it could act. There is no DB in the background storing scores, and no authentication.


## Code Example

``` javascript
$('.submitButton').on('click', function() {
	// Find Element that has Classes: Correct & Chosen.
	// Set Counter for correctly chosen answers
	var questionChoices = $(this).parent();
	var correctAnswer;
	questionChoices.children().each(function() {
		if ($(this).hasClass('chosen') && $(this).hasClass('correct')) {
			correctAnswer = true;
		}
	});
	var $note = $('<p class="message"></p>');
	// Add Pass or Fail Messages & Increment Page Counters (# Correct/# Incorrect)
	// Find correct answer - adds correct background to choice.
	if (correctAnswer) {
		$('.chosen').css("backgroundColor", "green");
		$(this).before($note);
		$note.addClass('pass').html($passText);
		$numberCorrect++;
	} else {
		$('.chosen').css("backgroundColor", "red");
		$(this).before($note);
		$note.addClass('fail').html($failText);
		$numberWrong++;
	}
	// Dim question choices after submit
	questionChoices.children('div').css("opacity", ".4");
	// Hide the Submit Button and show the Next button.
	$(this).hide();
	$(this).next().show();
});
```

## Motivation

This was developed with the intention of being part of a training program to help employees better understand specification material. It could be used for any number of reasons, and programs.

## Installation

Just load the .html file in any browser

## Shortcomings

1: Not responsive
2: No DB to store scores, results, leaderboards, etc
3: Too many global variables