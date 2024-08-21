# Simple Rating Dialogue

A simple rating dialogue based on HTML for collecting feedback for your websites.

## How to use it?

**Step 1:** Add the library:

```html
<script src="js/rating.min.js"></script>
```

**Step 2:** Configure the library in the best way for you:

```js
// Configured the settings
const settings = {
    numberStars: 5,
    minCharsAllowed: 35,
    starSize: 48, //optional
    fontFamily: 'Arial, Helvetica, sans-serif', //optional
    showOnSamePage: true, //optional
    autoSubmitMinStars: 4, //optional
    darkMode: true //optional
};

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

//Define the texts
const texts = {
    "ratingTitle": "Please rate us:",
    "feedbackTitle": "Please leave your feedback:",
    "reasonTitle": "Why did you visit us today?",
    "nextButtonText": "Next",
    "submitButtonText": "Submit",
    "closeButtonText": "Close",
    "thankYouMessage": "Thank you for your feedback!",
    //Optional sections
    "selectReason": "Select a reason",
    "reasons": [
        "Customer Support",
        "Product Inquiry",
        "Technical Issue",
        "General Question",
        "Other"
    ],
    "privacyOpts": {
        "text": "<a href='#' target='_blank'>I agree to the terms and conditions</a>",
        "checked": true
    },
    "optionalPage": {
        "text": "<p>Thank you! Please <a href='#'>click here</a> to learn more.</p>",
        "closeButtonText": "Close"
    }
};

//Start the dialogue
new FeedbackDialog(texts, handleSubmit, settings);
```

### Previews

![image](https://github.com/user-attachments/assets/2d53e805-5919-4bde-815b-fccaaccb890c)

![image](https://github.com/user-attachments/assets/acd84a84-ec9d-426f-b86b-9b115d91fbba)

![image](https://github.com/user-attachments/assets/12b77806-986a-4131-a6a8-f9d8c2466982)
