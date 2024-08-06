let questions = document.querySelectorAll(".question");
let answers = document.querySelectorAll(".answer");

questions.forEach((question, i) => {
    question.addEventListener('click', function() {
        const isActive = this.classList.contains('active');

        // Reset all questions and answers
        questions.forEach((s, j) => {
            s.classList.remove('active');
            answers[j].style.display = 'none';
            // Rotate the arrow back to its original position
            s.querySelector('.arrow').classList.remove('rotate');
        });

        // Toggle the clicked question and answer
        if (!isActive) {
            this.classList.add('active');
            answers[i].style.display = 'block';
            // Rotate the arrow for the clicked question
            this.querySelector('.arrow').classList.add('rotate');
        }
    });
});
