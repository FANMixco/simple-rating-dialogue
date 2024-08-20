(function() {
    // Create the dialogue container
    const dialogue = document.createElement('div');
    dialogue.style.position = 'fixed';
    dialogue.style.bottom = window.innerWidth <= 768 ? '10px' : '20px';
    dialogue.style.right = window.innerWidth <= 768 ? '10px' : '20px';
    dialogue.style.width = window.innerWidth <= 768 ? '90%' : '300px';
    dialogue.style.padding = '10px';
    dialogue.style.backgroundColor = '#f1f1f1';
    dialogue.style.border = '1px solid #ccc';
    dialogue.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    dialogue.style.zIndex = '1000';
    dialogue.style.borderRadius = '5px';
    dialogue.style.fontFamily = 'Arial, sans-serif';
    
    // Create the rating stage
    let ratingStage = document.createElement('div');
    let ratingTitle = document.createElement('p');
    ratingTitle.textContent = 'Please rate us:';
    ratingStage.appendChild(ratingTitle);

    let stars = [];
    for (let i = 1; i <= 5; i++) {
        let star = document.createElement('span');
        star.textContent = '☆';
        star.style.fontSize = '24px';
        star.style.cursor = 'pointer';
        star.style.color = '#ccc';
        star.setAttribute('data-value', i);
        stars.push(star);
        ratingStage.appendChild(star);
    }

    // Next button wrapper
    const nextButtonWrapper = document.createElement('div');
    nextButtonWrapper.style.marginTop = '10px';
    nextButtonWrapper.style.textAlign = 'right'; // Align button to the right
    nextButtonWrapper.style.display = 'none'; // Hidden until a rating is selected

    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.style.padding = '5px 10px';
    nextButton.style.backgroundColor = '#007bff';
    nextButton.style.color = '#fff';
    nextButton.style.border = 'none';
    nextButton.style.cursor = 'pointer';
    nextButton.style.borderRadius = '3px';

    nextButtonWrapper.appendChild(nextButton);
    ratingStage.appendChild(nextButtonWrapper);
    dialogue.appendChild(ratingStage);

    // Create the feedback stage
    const feedbackStage = document.createElement('div');
    feedbackStage.style.display = 'none';
    
    const feedbackTitle = document.createElement('p');
    feedbackTitle.textContent = 'Please leave your feedback:';
    feedbackStage.appendChild(feedbackTitle);

    const feedbackTextArea = document.createElement('textarea');
    feedbackTextArea.style.width = '95%';
    feedbackTextArea.style.height = '60px';
    feedbackTextArea.style.padding = '5px';
    feedbackTextArea.style.borderRadius = '3px';
    feedbackTextArea.style.border = '1px solid #ccc';
    feedbackTextArea.style.fontFamily = 'Arial, sans-serif';
    feedbackTextArea.style.resize = 'none';
    feedbackStage.appendChild(feedbackTextArea);

    const submitButtonWrapper = document.createElement('div');
    submitButtonWrapper.style.marginTop = '10px';
    submitButtonWrapper.style.textAlign = 'right'; // Align submit button to the right

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.style.padding = '5px 10px';
    submitButton.style.backgroundColor = '#007bff';
    submitButton.style.color = '#fff';
    submitButton.style.border = 'none';
    submitButton.style.cursor = 'not-allowed';
    submitButton.style.borderRadius = '3px';
    submitButton.disabled = true; // Disabled until 35 characters are typed

    submitButtonWrapper.appendChild(submitButton);
    feedbackStage.appendChild(submitButtonWrapper);
    dialogue.appendChild(feedbackStage);

    // Add the dialogue to the body
    document.body.appendChild(dialogue);

    // Rating star hover and click effects
    stars.forEach(function(star, index) {
        star.addEventListener('mouseover', function() {
            stars.forEach(function(s, i) {
                s.style.color = i <= index ? '#ff9800' : '#ccc';
            });
        });

        star.addEventListener('click', function() {
            stars.forEach(function(s, i) {
                s.style.color = i <= index ? '#ff9800' : '#ccc';
            });
            nextButtonWrapper.style.display = 'block';
        });
    });

    // Move to feedback stage
    nextButton.addEventListener('click', function() {
        ratingStage.style.display = 'none';
        feedbackStage.style.display = 'block';
    });

    // Enable the submit button if the feedback is at least 35 characters
    feedbackTextArea.addEventListener('input', function() {
        if (feedbackTextArea.value.length >= 35) {
            submitButton.style.cursor = 'pointer';
            submitButton.disabled = false;
        } else {
            submitButton.style.cursor = 'not-allowed';
            submitButton.disabled = true;
        }
    });

    // Submit feedback
    submitButton.addEventListener('click', function() {
        const rating = stars.filter(star => star.style.color === 'rgb(255, 152, 0)').length; // Number of stars selected
        const feedback = feedbackTextArea.value;

        console.log('Rating:', rating);
        console.log('Feedback:', feedback);

        // Send this data to your server via an AJAX request, fetch, etc.
        // Example:
        // fetch('/submit-feedback', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ rating: rating, feedback: feedback })
        // }).then(response => response.json())
        //   .then(data => console.log('Feedback submitted:', data));

        alert('Thank you for your feedback!');
        dialogue.remove();
    });
})();