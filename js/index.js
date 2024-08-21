// Define the callback function
function handleSubmit(data) {
    console.log('Submitting data:', data);
    // Here you can perform your API request, e.g., using fetch or XMLHttpRequest
    // Example:
    // fetch('/submit-feedback', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // }).then(response => response.json())
    //   .then(result => console.log('Feedback submitted:', result))
    //   .catch(error => console.error('Error submitting feedback:', error));
}

const texts = {
    "ratingTitle": "Please rate us:",
    "feedbackTitle": "Please leave your feedback:",
    "reasonTitle": "Why did you visit us today?",
    "nextButtonText": "Next",
    "submitButtonText": "Submit",
    "closeButtonText": "Close",
    "thankYouMessage": "Thank you for your feedback!"
};

new FeedbackDialog(texts, handleSubmit, { numberStars: 5, minCharsAllowed: 35, showOnSamePage: true, autoSubmitMinStars: 4, darkMode: true });