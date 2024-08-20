(function () {
    class FeedbackDialog {
        constructor(texts, minAllowed, feedbackMode, submitCallback) {
            this.texts = texts;
            this.minAllowed = minAllowed;
            this.feedbackMode = feedbackMode;
            this.submitCallback = submitCallback; // Store the callback
            this.createDialogue();
            this.addEventListeners();
        }

        createDialogue() {
            this.createContainer();
            this.createRatingStage();
            this.createFeedbackStage();
            this.createReasonStage();
            document.body.appendChild(this.dialogue);
        }

        createContainer() {
            this.dialogue = document.createElement('div');
            this.dialogue.style.position = 'fixed';
            this.dialogue.style.bottom = window.innerWidth <= 768 ? '10px' : '20px';
            this.dialogue.style.right = window.innerWidth <= 768 ? '10px' : '20px';
            this.dialogue.style.width = window.innerWidth <= 768 ? '90%' : '300px';
            this.dialogue.style.padding = '10px';
            this.dialogue.style.backgroundColor = '#f1f1f1';
            this.dialogue.style.border = '1px solid #ccc';
            this.dialogue.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
            this.dialogue.style.zIndex = '1000';
            this.dialogue.style.borderRadius = '5px';
        }

        createRatingStage() {
            this.ratingStage = document.createElement('div');
            const ratingTitle = document.createElement('p');
            ratingTitle.style.fontWeight = '900';
            ratingTitle.textContent = this.texts.ratingTitle;
            this.ratingStage.appendChild(ratingTitle);

            this.stars = [];
            for (let i = 1; i <= 5; i++) {
                const star = document.createElement('span');
                star.textContent = '☆';
                star.style.fontSize = '24px';
                star.style.cursor = 'pointer';
                star.style.color = '#ccc';
                star.setAttribute('data-value', i);
                this.stars.push(star);
                this.ratingStage.appendChild(star);
            }

            this.nextButtonWrapper = document.createElement('div');
            this.nextButtonWrapper.style.marginTop = '10px';
            this.nextButtonWrapper.style.textAlign = 'right';
            this.nextButtonWrapper.style.display = 'none';

            this.nextButton = document.createElement('button');
            this.nextButton.textContent = this.texts.nextButtonText;
            this.nextButton.style.padding = '5px 10px';
            this.nextButton.style.backgroundColor = '#007bff';
            this.nextButton.style.color = '#fff';
            this.nextButton.style.border = 'none';
            this.nextButton.style.cursor = 'pointer';
            this.nextButton.style.borderRadius = '3px';

            this.nextButtonWrapper.appendChild(this.nextButton);
            this.ratingStage.appendChild(this.nextButtonWrapper);
            this.dialogue.appendChild(this.ratingStage);
        }

        createFeedbackStage() {
            this.feedbackStage = document.createElement('div');
            this.feedbackStage.style.display = 'none';

            const feedbackTitle = document.createElement('p');
            feedbackTitle.textContent = this.texts.feedbackTitle;
            feedbackTitle.style.fontWeight = '900';
            this.feedbackStage.appendChild(feedbackTitle);

            this.feedbackTextArea = document.createElement('textarea');
            this.feedbackTextArea.style.width = '95%';
            this.feedbackTextArea.style.height = '60px';
            this.feedbackTextArea.style.padding = '5px';
            this.feedbackTextArea.style.borderRadius = '3px';
            this.feedbackTextArea.style.border = '1px solid #ccc';
            this.feedbackTextArea.style.fontFamily = 'Arial, sans-serif';
            this.feedbackTextArea.style.resize = 'none';
            this.feedbackStage.appendChild(this.feedbackTextArea);

            this.submitButtonWrapper = document.createElement('div');
            this.submitButtonWrapper.style.marginTop = '10px';
            this.submitButtonWrapper.style.textAlign = 'right';

            this.submitButton = document.createElement('button');
            this.submitButton.textContent = this.texts.submitButtonText;
            this.submitButton.style.padding = '5px 10px';
            this.submitButton.style.backgroundColor = '#ccc'; // Initial disabled state
            this.submitButton.style.color = '#666'; // Initial disabled state
            this.submitButton.style.border = 'none';
            this.submitButton.style.cursor = 'not-allowed';
            this.submitButton.style.borderRadius = '3px';
            this.submitButton.disabled = true;

            this.submitButtonWrapper.appendChild(this.submitButton);
            this.feedbackStage.appendChild(this.submitButtonWrapper);
            this.dialogue.appendChild(this.feedbackStage);
        }

        createReasonStage() {
            this.reasonStage = document.createElement('div');
            this.reasonStage.style.display = 'none';

            // Create and style the reasonTitle
            this.reasonTitle = document.createElement('p');
            this.reasonTitle.textContent = this.texts.reasonTitle;
            this.reasonTitle.style.fontWeight = "900";
            this.reasonStage.appendChild(this.reasonTitle);

            // Create and style the reasonSelect dropdown
            this.reasonSelect = document.createElement('select');
            this.reasonSelect.style.width = '100%';
            this.reasonSelect.style.paddingTop = '5px';
            this.reasonSelect.style.paddingBottom = '10px'; // Padding to ensure space below
            this.reasonSelect.style.borderRadius = '3px';
            this.reasonSelect.style.border = '1px solid #ccc';
            this.reasonSelect.style.marginBottom = '10px'; // Padding-bottom for the select element

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = this.texts.selectReason;
            defaultOption.disabled = true; // Disabled by default
            defaultOption.selected = true; // Pre-selected option
            this.reasonSelect.appendChild(defaultOption);

            this.texts.reasons.forEach((reason) => {
                const option = document.createElement('option');
                option.value = reason;
                option.textContent = reason;
                this.reasonSelect.appendChild(option);
            });

            this.reasonStage.appendChild(this.reasonSelect);

            // Create and style the feedbackTitle
            this.feedbackTitle = document.createElement('p');
            this.feedbackTitle.textContent = this.texts.feedbackTitle;
            this.feedbackTitle.style.fontWeight = "900";
            this.reasonStage.appendChild(this.feedbackTitle);

            // Create and style the reasonFeedbackTextArea
            this.reasonFeedbackTextArea = document.createElement('textarea');
            this.reasonFeedbackTextArea.style.width = '95%';
            this.reasonFeedbackTextArea.style.height = '60px';
            this.reasonFeedbackTextArea.style.padding = '5px';
            this.reasonFeedbackTextArea.style.borderRadius = '3px';
            this.reasonFeedbackTextArea.style.border = '1px solid #ccc';
            this.reasonFeedbackTextArea.style.resize = 'none';
            this.reasonStage.appendChild(this.reasonFeedbackTextArea);

            // Create and style the reasonSubmitButtonWrapper
            this.reasonSubmitButtonWrapper = document.createElement('div');
            this.reasonSubmitButtonWrapper.style.marginTop = '10px';
            this.reasonSubmitButtonWrapper.style.textAlign = 'right'; // Align submit button to the right

            // Create and style the reasonSubmitButton
            this.reasonSubmitButton = document.createElement('button');
            this.reasonSubmitButton.textContent = this.texts.submitButtonText;
            this.reasonSubmitButton.style.padding = '5px 10px';
            this.reasonSubmitButton.style.backgroundColor = '#ccc';
            this.reasonSubmitButton.style.color = '#666';
            this.reasonSubmitButton.style.border = 'none';
            this.reasonSubmitButton.style.cursor = 'not-allowed';
            this.reasonSubmitButton.style.borderRadius = '3px';
            this.reasonSubmitButton.disabled = true; // Disabled until a reason is selected and 35 characters are typed

            this.reasonSubmitButtonWrapper.appendChild(this.reasonSubmitButton);
            this.reasonStage.appendChild(this.reasonSubmitButtonWrapper);
            this.dialogue.appendChild(this.reasonStage);
        }


        addEventListeners() {
            this.stars.forEach((star, index) => {
                star.addEventListener('mouseover', () => this.handleStarHover(index));
                star.addEventListener('click', () => this.handleStarClick(index));
            });

            this.nextButton.addEventListener('click', () => this.handleNextButtonClick());
            this.feedbackTextArea.addEventListener('input', () => this.handleFeedbackInput());
            this.reasonSelect.addEventListener('change', () => this.handleReasonSelectChange());
            this.reasonFeedbackTextArea.addEventListener('input', () => this.handleReasonFeedbackInput());

            this.submitButton.addEventListener('click', () => this.handleSubmitFeedback());
            this.reasonSubmitButton.addEventListener('click', () => this.handleSubmitReasonFeedback());
        }

        handleStarHover(index) {
            this.stars.forEach((star, i) => {
                star.style.color = i <= index ? '#ff9800' : '#ccc';
            });
        }

        handleStarClick(index) {
            this.stars.forEach((star, i) => {
                star.style.color = i <= index ? '#ff9800' : '#ccc';
            });
            this.nextButtonWrapper.style.display = 'block';
        }

        handleNextButtonClick() {
            this.ratingStage.style.display = 'none';
            if (this.feedbackMode === 'feedbackOnly') {
                this.feedbackStage.style.display = 'block';
            } else {
                this.reasonStage.style.display = 'block';
            }
        }

        handleFeedbackInput() {
            if (this.feedbackTextArea.value.length >= this.minAllowed) {
                this.submitButton.style.backgroundColor = '#007bff';
                this.submitButton.style.color = '#fff';
                this.submitButton.style.cursor = 'pointer';
                this.submitButton.disabled = false;
            } else {
                this.submitButton.style.backgroundColor = '#ccc';
                this.submitButton.style.color = '#666';
                this.submitButton.style.cursor = 'not-allowed';
                this.submitButton.disabled = true;
            }
        }

        handleReasonSelectChange() {
            this.checkReasonAndFeedback();
        }

        handleReasonFeedbackInput() {
            this.checkReasonAndFeedback();
        }

        checkReasonAndFeedback() {
            if (this.reasonSelect.value && this.reasonFeedbackTextArea.value.length >= this.minAllowed) {
                this.reasonSubmitButton.style.backgroundColor = '#007bff';
                this.reasonSubmitButton.style.color = '#fff';
                this.reasonSubmitButton.style.cursor = 'pointer';
                this.reasonSubmitButton.disabled = false;
            } else {
                this.reasonSubmitButton.style.backgroundColor = '#ccc';
                this.reasonSubmitButton.style.color = '#666';
                this.reasonSubmitButton.style.cursor = 'not-allowed';
                this.reasonSubmitButton.disabled = true;
            }
        }

        handleSubmitFeedback() {
            const rating = this.stars.filter(star => star.style.color === 'rgb(255, 152, 0)').length;
            const feedback = this.feedbackTextArea.value;
            console.log('Rating:', rating);
            console.log('Feedback:', feedback);
            if (typeof this.submitCallback === 'function') {
                this.submitCallback({ rating, feedback });
            }
            // Send this data to your server via an AJAX request, fetch, etc.
            alert(this.texts.thankYouMessage);
            this.dialogue.remove();
        }

        handleSubmitReasonFeedback() {
            const rating = this.stars.filter(star => star.style.color === 'rgb(255, 152, 0)').length;
            const feedback = this.reasonFeedbackTextArea.value;
            const reason = this.reasonSelect.value;
            console.log('Rating:', rating);
            console.log('Reason:', reason);
            console.log('Feedback:', feedback);
            if (typeof this.submitCallback === 'function') {
                this.submitCallback({ rating, reason, feedback });
            }
            // Send this data to your server via an AJAX request, fetch, etc.
            alert(this.texts.thankYouMessage);
            this.dialogue.remove();
        }
    }

    const feedbackMode = Math.random() < 0.5 ? 'feedbackOnly' : 'reasonWithFeedback';
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
        "thankYouMessage": "Thank you for your feedback!",
        "selectReason": "Select a reason",
        "reasons": [
            "Customer Support",
            "Product Inquiry",
            "Technical Issue",
            "General Question",
            "Other"
        ]
    };

    new FeedbackDialog(texts, 35, 'reasonWithFeedback'), handleSubmit;
})();