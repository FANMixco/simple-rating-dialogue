class FeedbackDialog {
    lightModeStyles = {
        backgroundColor: '#f1f1f1',
        borderColor: '#ccc',
        textColor: '#333',
        starColor: '#ccc',
        starSelectedColor: '#ff9800',
        buttonBackgroundColor: '#007bff',
        buttonTextColor: '#fff',
        closeButtonBackgroundColor: '#ccc',
        closeButtonTextColor: '#333',
        checkboxTextColor: '#333'
    };

    darkModeStyles = {
        backgroundColor: '#212121',
        borderColor: '#444',
        textColor: '#f1f1f1',
        starColor: '#666',
        starSelectedColor: '#ffcc00',
        buttonBackgroundColor: '#3E50B4',
        buttonTextColor: '#fff',
        closeButtonBackgroundColor: '#666',
        closeButtonTextColor: '#f1f1f1',
        checkboxTextColor: '#f1f1f1',
        linkTextColor: '#87cefa'
    };

    constructor(texts, submitCallback, settings = { numberStars: 5, minCharsAllowed: 35, darkMode: false }) {
        if (!texts) {
            console.error('The texts cannot be empty!');
            return;
        }

        if (!(texts.ratingTitle ||
            texts.feedbackTitle ||
            texts.reasonTitle ||
            texts.nextButtonText ||
            texts.submitButtonText ||
            texts.thankYouMessage ||
            texts.closeButtonText)) {
            console.error('Basic texts are not supplied!');
            return;
        }

        if (texts.reasons) {
            if (!(texts.reasons.text || texts.reasons.options)) {
                console.error('Reasons are incorrect!');
                return;
            }
        }

        if (texts.privacyOpts) {
            if (texts.privacyOpts.text || texts.privacyOpts.checked) {
                if (!(texts.privacyOpts.text || texts.privacyOpts.checked)) {
                    console.error('Privacy options are incorrect!');
                    return;
                }
            }
        }

        if (texts.optionalPage) {
            if (texts.optionalPage.text || texts.optionalPage.closeButtonText) {
                if (!(texts.optionalPage.text || texts.optionalPage.closeButtonText)) {
                    console.error('Optional page data is incorrect!');
                    return;
                }
            }
        }

        if (!submitCallback) {
            console.error('A submitCallback must be passed!');
            return;
        }
        if (!(settings.numberStars || settings.minCharsAllowed || settings.darkMode)) {
            console.error('The minimum number of stars, the minimum number of characters or the dark mode is undefined!');
            return;
        }
        if (settings.numberStars < 3) {
            console.error('The total stars cannot be lower than 3!');
            return;
        }
        if (settings.autoSubmitMinStars > settings.numberStars) {
            console.error('The number of stars cannot be lower than the auto submit minumum stars!');
            return;
        }

        this.texts = texts;
        this.submitCallback = submitCallback; // Store the callback
        this.privacyOpts = texts.privacyOpts;
        this.settings = settings;
        this.modeStyles = settings.darkMode ? this.darkModeStyles : this.lightModeStyles;
        this.createDialogue();
        this.addEventListeners();
    }

    createDialogue() {
        this.createContainer();
        this.createRatingStage();
        this.createFeedbackStage();
        if (this.texts.optionalPage) {
            this.createOptionalPage();
        }
        document.body.appendChild(this.dialogue);

        if (this.settings.darkMode) {
            document.querySelectorAll('a').forEach(link => {
                link.style.color = this.darkModeStyles.linkTextColor;
            });
        }
    }

    createContainer() {
        this.dialogue = document.createElement('div');

        this.dialogue.style.backgroundColor = this.modeStyles.backgroundColor;
        this.dialogue.style.border = `1px solid ${this.modeStyles.borderColor}`;
        this.dialogue.style.color = this.modeStyles.textColor;
        this.dialogue.style.fontFamily = (!this.settings.fontFamily) ? 'Arial, Helvetica, sans-serif' : this.settings.fontFamily;

        this.dialogue.id = (this.settings.id) ? this.settings.id : 'feedbackDialogue';

        this.dialogue.style.position = 'fixed';
        this.dialogue.style.bottom = window.innerWidth <= 768 ? '10px' : '20px';
        this.dialogue.style.right = window.innerWidth <= 768 ? '10px' : '20px';
        this.dialogue.style.width = window.innerWidth <= 768 ? '90%' : '300px';
        this.dialogue.style.padding = '10px';
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
        const starSize = `${(!this.settings.starSize) ? 48 : this.settings.starSize}px`;
        for (let i = 1; i <= this.settings.numberStars; i++) {
            const star = document.createElement('span');
            star.textContent = '☆';
            star.style.fontSize = starSize;
            star.style.cursor = 'pointer';
            star.style.color = this.modeStyles.starColor;
            star.setAttribute('data-value', i);
            this.stars.push(star);
            this.ratingStage.appendChild(star);
        }

        this.closeButtonWrapper = document.createElement('div');
        this.closeButtonWrapper.style.marginTop = '10px';
        this.closeButtonWrapper.style.textAlign = 'right';

        // Create and style the close button
        const closeButtonStars = document.createElement('button');

        this.createBntStyle(closeButtonStars, this.texts.closeButtonText);

        closeButtonStars.addEventListener('click', () => {
            this.dialogue.remove();
        });

        this.ratingStage.appendChild(this.closeButtonWrapper);
        this.closeButtonWrapper.appendChild(closeButtonStars);

        this.nextButtonWrapper = document.createElement('div');
        this.nextButtonWrapper.style.marginTop = '10px';
        this.nextButtonWrapper.style.textAlign = 'right';
        this.nextButtonWrapper.style.display = 'none';

        this.nextButton = document.createElement('button');

        this.createBntStyle(this.nextButton, this.texts.nextButtonText);

        this.nextButtonWrapper.appendChild(this.nextButton);
        this.ratingStage.appendChild(this.nextButtonWrapper);
        this.dialogue.appendChild(this.ratingStage);
    }

    createBntStyle(button, text) {
        button.textContent = text;
        button.style.padding = '5px 10px';
        button.style.backgroundColor = this.modeStyles.buttonBackgroundColor;
        button.style.color = this.modeStyles.buttonTextColor;
        button.style.border = 'none';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '3px';
    }

    createFeedbackStage() {
        this.feedbackStage = document.createElement('div');
        this.feedbackStage.style.display = 'none';

        if (this.texts.reasons) {
            // Create and style the reasonTitle
            this.reasonTitle = document.createElement('p');
            this.reasonTitle.textContent = this.texts.reasonTitle;
            this.reasonTitle.style.fontWeight = "900";
            this.feedbackStage.appendChild(this.reasonTitle);

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
            defaultOption.textContent = this.texts.reasons.text;
            defaultOption.disabled = true; // Disabled by default
            defaultOption.selected = true; // Pre-selected option
            this.reasonSelect.appendChild(defaultOption);

            this.texts.reasons.options.forEach((reason) => {
                const option = document.createElement('option');
                option.value = reason.value;
                option.textContent = reason.text;
                this.reasonSelect.appendChild(option);
            });

            this.feedbackStage.appendChild(this.reasonSelect);
        }

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
        this.feedbackTextArea.style.resize = 'none';
        this.feedbackStage.appendChild(this.feedbackTextArea);

        if (this.privacyOpts) {
            // Create and style the checkboxWrapper
            this.checkboxWrapper = document.createElement('div');
            this.checkboxWrapper.style.marginTop = '10px';
            this.checkboxWrapper.style.display = 'flex';
            this.checkboxWrapper.style.alignItems = 'center';

            // Create the checkbox input
            this.checkboxInput = document.createElement('input');
            this.checkboxInput.type = 'checkbox';
            this.checkboxInput.checked = this.privacyOpts.checked;
            this.checkboxInput.style.marginRight = '5px';

            // Create the label with HTML content
            this.checkboxLabel = document.createElement('label');
            this.checkboxLabel.innerHTML = this.privacyOpts.text;

            // Append checkbox and label to the wrapper
            this.checkboxWrapper.appendChild(this.checkboxInput);
            this.checkboxWrapper.appendChild(this.checkboxLabel);
            this.feedbackStage.appendChild(this.checkboxWrapper);

            // Update the submit button enabling logic
            this.checkboxInput.addEventListener('change', this.validateInput.bind(this));
        }

        this.submitButtonWrapper = document.createElement('div');
        this.submitButtonWrapper.style.marginTop = '10px';
        this.submitButtonWrapper.style.textAlign = 'right';

        this.submitButton = document.createElement('button');

        this.createBntStyle(this.submitButton, this.texts.submitButtonText);

        this.submitButtonWrapper.appendChild(this.submitButton);
        this.feedbackStage.appendChild(this.submitButtonWrapper);
        this.dialogue.appendChild(this.feedbackStage);

        this.validateInput();
    }

    addEventListeners() {
        this.stars.forEach((star, index) => {
            star.addEventListener('mouseover', () => this.handleStarHover(index));
            star.addEventListener('click', () => this.handleStarClick(index));
        });

        this.nextButton.addEventListener('click', () => this.handleNextButtonClick());
        this.feedbackTextArea.addEventListener('input', () => this.validateInput());
        this.submitButton.addEventListener('click', () => this.handleSubmitFeedback());

        if (this.texts.reasons) {
            this.reasonSelect.addEventListener('change', () => this.handleReasonSelectChange());
        }
    }

    handleAutoSubmit(selectedStars) {
        this.submitCallback({ selectedStars });

        // If there is an optional third page, show it
        if (this.optionalStage) {
            this.ratingStage.style.display = 'none';
            this.optionalStage.style.display = 'block';
        } else {
            // Otherwise, simply thank the user and remove the dialogue
            alert(this.texts.thankYouMessage);
            this.dialogue.remove();
        }
    }

    handleStarHover(index) {
        this.stars.forEach((star, i) => {
            star.textContent = i <= index ? '★' : '☆';
            star.style.color = i <= index ? '#ff9800' : '#ccc';
        });
    }

    handleStarClick(index) {
        this.closeButtonWrapper.style.display = 'none';
        this.handleStarHover(index);

        const selectedStars = index + 1; // Because index is zero-based

        // Check if the selected stars meet or exceed the auto-submit threshold
        if (this.settings.autoSubmitMinStars && selectedStars >= this.settings.autoSubmitMinStars) {
            this.handleAutoSubmit(selectedStars);
        } else {
            if (!this.settings.showOnSamePage) {
                this.nextButtonWrapper.style.display = 'block';
            } else {
                this.feedbackStage.style.display = 'block';
            }
        }

        this.stars.forEach((star) => {
            const newStar = star.cloneNode(true); // Create a clone of the star
            star.parentNode.replaceChild(newStar, star); // Replace the original star with the clone
        });
    }

    handleNextButtonClick() {
        this.ratingStage.style.display = 'none';
        this.feedbackStage.style.display = 'block';
    }

    handleReasonSelectChange() {
        this.validateInput();
    }

    handleReasonFeedbackInput() {
        this.validateInput();
    }

    validateInput() {
        const submitBtn = this.submitButton;

        let validation = false;
        let feedbackLengthValid = this.feedbackTextArea.value.length >= this.settings.minCharsAllowed;
        const checkboxValid = this.privacyOpts ? this.checkboxInput.checked : true;

        if (this.texts.reasons) {
            feedbackLengthValid = feedbackLengthValid && this.reasonSelect.value;
        }

        validation = feedbackLengthValid && checkboxValid;

        if (validation) {
            submitBtn.style.backgroundColor = this.modeStyles.buttonBackgroundColor;
            submitBtn.style.color = this.modeStyles.buttonTextColor;
            submitBtn.style.cursor = 'pointer';
            submitBtn.disabled = false;
        } else {
            submitBtn.style.backgroundColor = '#ccc';
            submitBtn.style.color = '#666';
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.disabled = true;
        }
    }

    createOptionalPage() {
        this.optionalStage = document.createElement('div');
        this.optionalStage.style.display = 'none';

        // Create and style the content container
        const optionalContent = document.createElement('div');
        optionalContent.innerHTML = this.texts.optionalPage.text;
        this.optionalStage.appendChild(optionalContent);

        // Create and style the close button
        const closeButton = document.createElement('button');

        this.createBntStyle(closeButton, this.texts.optionalPage.closeButtonText);

        closeButton.style.float = 'right';

        closeButton.addEventListener('click', () => {
            this.dialogue.remove();
        });

        this.optionalStage.appendChild(closeButton);

        this.dialogue.appendChild(this.optionalStage);
    }

    handleSubmitFeedback() {
        const rating = this.stars.filter(star => star.style.color === 'rgb(255, 152, 0)').length;
        const feedback = this.feedbackTextArea.value;

        if (typeof this.submitCallback === 'function') {
            if (!this.texts.reasons) {
                this.submitCallback({ rating, feedback });
            } else {
                const reason = this.reasonSelect;
                this.submitCallback({ rating, reason, feedback });
            }
        }

        if (!texts.optionalPage) {
            // Send this data to your server via an AJAX request, fetch, etc.
            alert(this.texts.thankYouMessage);
            this.dialogue.remove();
        } else {

            // Show the optional page instead of alert
            this.ratingStage.style.display = 'none';
            this.feedbackStage.style.display = 'none';
            this.optionalStage.style.display = 'block'; // Show optional page
        }
    }
}