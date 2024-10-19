# Simple Rating Dialogue

A simple rating dialogue based on HTML for collecting feedback for your websites.

## Support me:

[![sponsor me][2]](https://www.buymeacoffee.com/fanmixco)

## How to use it?

**Step 1:** Add the library:

- [Download the latest release](https://github.com/FANMixco/simple-rating-dialogue/archive/refs/tags/v1.0.4.zip)

- Install with [npm](https://www.npmjs.com/): `npm i simple-rating-dialogue`

|Latest Release|Downloads|
|:------------:|:------------:|
|[![npm version](https://img.shields.io/npm/v/simple-rating-dialogue)](https://www.npmjs.com/package/simple-rating-dialogue)|[![NuGet Badge SpotsDialog.Xamarin](https://img.shields.io/npm/dt/simple-rating-dialogue)](https://www.npmjs.com/package/simple-rating-dialogue/)|

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
    darkMode: true, //optional
    id: "myID" //optional
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
    "reasons": {
        "text": "Select a reason",
        "options": [
            {
                "value": 0,
                "text": "Customer Support",
            },
            {
                "value": 1,
                "text": "Product Inquiry",
            },
            {
                "value": 2,
                "text": "Technical Issue",
            },
            {
                "value": 3,
                "text": "General Question",
            },
            {
                "value": 4,
                "text": "Other",
            }
        ]
    },
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

![Preview 1](https://github.com/user-attachments/assets/5a3d885c-de66-4322-b00e-da403eabed9e)

![Preview 2](https://github.com/user-attachments/assets/5b52d31a-d611-4842-a87a-03cc923fe911)

## Follow me on

|  LinkedIn  |YouTube|Amazon|Goodreads|Instagram|Cyber Prophets|Sharing Your Stories|TikTok|
|:----------|:------------:|:------------:|:------------:|:------------:|:------------:|:------------:|:------------:|
|[![LinkedIn](https://i.sstatic.net/idQWu.png)](https://www.linkedin.com/in/federiconavarrete)|[![YouTube](https://i.sstatic.net/CFPMR.png)](https://youtube.com/@FedericoNavarrete)|[![Amazon](https://i.sstatic.net/NFOeE.png)](https://www.amazon.com/Federico-Navarrete/e/B08NJTXQRV)|[![Goodreads](https://i.sstatic.net/oBk0g.jpg)](https://www.goodreads.com/author/show/21125413.Federico_Navarrete)|[![Instagram](https://i.sstatic.net/PIfqY.png)](https://www.instagram.com/federico_the_consultant)|[![RedCircle Podcast](https://i.sstatic.net/4XICF.png)](https://redcircle.com/shows/cyber-prophets)|[![RedCircle Podcast](https://i.sstatic.net/4XICF.png)](https://redcircle.com/shows/sharing-your-stories)|[![TikTok](https://i.sstatic.net/pP7X2.png)](https://www.tiktok.com/@federicostories)|

  [2]: https://raw.githubusercontent.com/FANMixco/Xamarin-SearchBar/master/bmc-rezr5vpd.gif
