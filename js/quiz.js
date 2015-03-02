/* Quiz.js
 *
 * App allows users to take test, keeps track of score, prompts for retake if fail
 * No database built in yet...but would keep track of user score in database.
 * Try and allow for user to log in and see other scores.
*/

// Hides all parents - QUESTIONS - on load except the first one. 
// Hides all NEXT buttons on load
$('.mainContent:not("#first")').hide();
$('.nextButton').hide();

// Sets Page Counters
var $numberCorrect = 0;
var $numberWrong = 0;
var $points;
var $weight = 3;
var $currentQ = 1;

// Quiz Question Number Updates
var $qNumHolder = $('#currentQuestionNum');
$qNumHolder.html($currentQ);
var $numOfQuestions = $('.mainContent').length - 1;
var $questionNumHolder = $('#numOfQuestions');
$questionNumHolder.html($numOfQuestions);

// Pass or Fail text
var $passText = "Great Job! Please click NEXT below.";
var $failText = "Sorry, that is incorrect! Please click NEXT below.";

// Adds highlight to ANSWER CHOICE (also adds .chosen class)
$('.option').on('click', function() {
	$('.option').removeClass('chosen');
	$(this).addClass('chosen');
});

// CLICK SUBMIT - CHECK ANSWER
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

// CLICK NEXT
// Whichever button you press, the immediate sibling of the questionChoices is hidden.
$('.nextButton').on('click', function() {
	var parent = $(this).parent();
	var grandparent = parent.parent();
	grandparent.hide();
	grandparent.next().slideDown(700);
	$('#counterRight').html($numberCorrect);
	$('#counterWrong').html($numberWrong);
	$('.counterRightHolder').addClass('pass');
	$('.counterWrongHolder').addClass('fail');
	$currentQ++;
	$qNumHolder.html($currentQ);
});

// Give a Pass or Fail message when clicking Done.
$('#done').on('click', function() {
	// Check counters in the $numberCorrect & $numberWrong variables
	if ($numberCorrect < 3) {
		$('#completeMessage').html("You have not passed this quiz.");
		$('.retake').show();
	} else {
		$('#completeMessage').html("Congratulations! You passed this quiz.");
		$('.retake').hide();
		$('.option:last').html("THANK YOU! See more Quizzes available in the sidebar.");
	}
	$points = $numberCorrect * $weight;
	$('#points').html($points);
	$qNumHolder.html($currentQ - 1);
});


// If fail the test, RETAKE button allows to refresh the quiz.
$('.retake').on('click', function() {
	location.reload();
});