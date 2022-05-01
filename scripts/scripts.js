/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */

const questions = [
    {
      "question": "What Type of Exercise Did You Do Today?",
      "answer1": "Off Day",
      "answer1Total": "1",
      "answer2": "Easy Run or Cross Train",
      "answer2Total": "2",
      "answer3": "Workout or Race",
      "answer3Total": "3"
    },
    {
      "question": "How Many Times Did You Exercise Today?",
      "answer1": "No Exercise Today",
      "answer1Total": "1",
      "answer2": "One Time",
      "answer2Total": "2",
      "answer3": "More Than Once",
      "answer3Total": "3"
    },
    {
      "question": "How Long Did You Exercise For Today?",
      "answer1": "45 Minutes or Less",
      "answer1Total": "1",
      "answer2": "45 to 90 Minutes",
      "answer2Total": "2",
      "answer3":
        "Over 90 Minutes",
      "answer3Total": "3"
    },
    {
      "question":
        "Rate The Intensity of Your Exercise Today",
      "answer1": "Easy or Off",
      "answer1Total": "1",
      "answer2": "Medium",
      "answer2Total": "2",
      "answer3": "Hard",
      "answer3Total": "3"
    },
  ]
  
  
  let currentQuestion = 0;
  let score = [];
  let selectedAnswersData = [];
  const totalQuestions =questions.length;
  
  const container = document.querySelector('.quiz-container');
  const questionEl = document.querySelector('.question');
  const option1 = document.querySelector('.option1');
  const option2 = document.querySelector('.option2');
  const option3 = document.querySelector('.option3');
  const nextButton = document.querySelector('.next');
  const previousButton = document.querySelector('.previous');
  const restartButton = document.querySelector('.restart');
  const result = document.querySelector('.result');
  
  //Function to generate question 
  function generateQuestions (index) {
      //Select each question by passing it a particular index
      const question = questions[index];
      const option1Total = questions[index].answer1Total;
      const option2Total = questions[index].answer2Total;
      const option3Total = questions[index].answer3Total;
      //Populate html elements 
      questionEl.innerHTML = `${index + 1}. ${question.question}`
      option1.setAttribute('data-total', `${option1Total}`);
      option2.setAttribute('data-total', `${option2Total}`);
      option3.setAttribute('data-total', `${option3Total}`);
      option1.innerHTML = `${question.answer1}`
      option2.innerHTML = `${question.answer2}`
      option3.innerHTML = `${question.answer3}`
  }
  
  
  function loadNextQuestion () {
      const selectedOption = document.querySelector('input[type="radio"]:checked');
      //Check if there is a radio input checked
      if(!selectedOption) {
          alert('Please select your answer!');
          return;
      }
      //Get value of selected radio
      const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));
  
      ////Add the answer score to the score array
      score.push(answerScore);
  
      selectedAnswersData.push()
      
  
      const totalScore = score.reduce((total, currentNum) => total + currentNum);
  
      //Finally we incement the current question number ( to be used as the index for each array)
      currentQuestion++;
  
          //once finished clear checked
          selectedOption.checked = false;
      //Final question
      if(currentQuestion == totalQuestions - 1) {
          nextButton.textContent = 'Finish';
      }
      //Hide the questions container and show the results 
      if(currentQuestion == totalQuestions) {
          container.style.display = 'none';
          result.innerHTML =
           `<h1 class="final-score">Your score: ${totalScore}</h1>
           <div class="summary">
              <h1>Your Personal Plate</h1>
              <h2>Now that you have the point score correlated with your day, see below for which plate will be ideal to help you recover and thrive in your next session! </h2>
              <p>1 to 5 points - Plate #1</p>
              <p>6 to 9 points - Plate #2</p>
              <p>10+ points - Plate #3 </p>
              <h2> Select Your Plate Below </h2>
          </div>
          <button class="restart">Restart Quiz</button>
           `;
          return;
      }
      generateQuestions(currentQuestion);
  }
  
  //Load previous question
  function loadPreviousQuestion() {
      //Decrement quentions index
      currentQuestion--;
      //remove last array value;
      score.pop();
      //Generate the question
      generateQuestions(currentQuestion);
  }
  
  //Reset and restart the quiz;
  function restartQuiz(e) {
      if(e.target.matches('button')) {
      //reset array index and score
      currentQuestion = 0;
      score = [];
      //Reload quiz
      location.reload();
      }
  
  }
  
  generateQuestions(currentQuestion);
  nextButton.addEventListener('click', loadNextQuestion);
  previousButton.addEventListener('click',loadPreviousQuestion);
  result.addEventListener('click',restartQuiz);