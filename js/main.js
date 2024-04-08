function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function generateQuestion() {
    var num1 = getRandomNumber(1, 10);
    var num2 = getRandomNumber(1, 10);
    var operator = ['+', '-', 'x'][getRandomNumber(0, 2)];
    var answer;
    switch (operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case 'x':
            answer = num1 * num2;
            break;
    }
    return {
        question: num1 + ' ' + operator + ' ' + num2 + ' = ?',
        answer: answer
    };
}


function generateOptions(correctAnswer) {
    var options = [correctAnswer];
    while (options.length < 4) {
        var randomOption = getRandomNumber(correctAnswer - 10, correctAnswer + 10);
        if (options.indexOf(randomOption) === -1) {
            options.push(randomOption);
        }
    }
    return options.sort(function() { return Math.random() - 0.5; });
}


function displayQuestion() {
    var questionObj = generateQuestion();
    var options = generateOptions(questionObj.answer);

    document.getElementById('question').textContent = questionObj.question;
    var optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    options.forEach(function(option) {
        var optionButton = document.createElement('button');
        optionButton.classList.add('option');
        optionButton.textContent = option;
        optionButton.onclick = function() {
            if (option === questionObj.answer) {
                alert('Goed gedaan!');
            } else {
                alert('Fout! Het juiste antwoord was ' + questionObj.answer);
            }
            displayQuestion();
        };
        optionsDiv.appendChild(optionButton);
    });
}


displayQuestion();