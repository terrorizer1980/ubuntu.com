(function() {
  function toggleTutorialNavigation() {
    const toggleButton = document.querySelector('.l-tutorial__nav-toggle');
    const menu = document.querySelector('.l-tutorial__nav');
    toggleButton.classList.toggle('p-icon--menu');
    toggleButton.classList.toggle('p-icon--close');
    menu.classList.toggle('u-hide--small');
  }

  function setActiveLink(navigationItems) {
    [].forEach.call(navigationItems, item => {
      const link = item.querySelector('.l-tutorial__nav-link');
      if (link.getAttribute('href') === window.location.hash) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });
  };

  const navigationItems = document.querySelectorAll('.l-tutorial__nav-item');
  const toggleButton = document.querySelector('.l-tutorial__nav-toggle');

  if (toggleButton) {
    toggleButton.addEventListener('click', toggleTutorialNavigation);
  }

  setActiveLink(navigationItems);

  [].forEach.call(navigationItems, item => {
    const link = item.querySelector('.l-tutorial__nav-link');
    link.addEventListener('click', toggleTutorialNavigation);
  });

  window.addEventListener('hashchange', e => {
    e.preventDefault();
    setActiveLink(navigationItems);
  });

  sectionIds = [];

  const tutorialSections = document.querySelectorAll('.l-tutorial__content section');
  [].forEach.call(tutorialSections, section => {
    sectionIds.push(section.id);
  });

  // Navigate to first tutorial step on load if no URL hash
  if (!window.location.hash) {
    const firstSectionLink = document.querySelector('.l-tutorial__nav-link');
    if (firstSectionLink) {
      window.location.hash = firstSectionLink.getAttribute('href');
    }
  } else {
    // Redirect #0, #1 etc. to the correct section
    match = window.location.hash.match(/^#(\d+)$/);

    if (match) {
      index = parseInt(match[1]);
      sectionId = sectionIds[index];
      window.location.hash = '#' + sectionId;
      window.location.reload();
    }
  }

  const tutorialFeedbackOptions = document.querySelector('.l-tutorial__feedback-options');
  const tutorialFeedbackIcons = document.querySelectorAll('.js-feedback-icon');
  const tutorialFeedbackResult = document.querySelector('.l-tutorial__feedback-result');

  [].forEach.call(tutorialFeedbackIcons, icon => {
    icon.addEventListener('click', function(e) {
      const feedbackValue = e.target.getAttribute('data-feedback-value');
      dataLayer.push({
        'event' : 'GAEvent',
        'eventCategory' : 'feedback',
        'eventAction' : feedbackValue,
        'eventLabel' : feedbackValue,
        'eventValue' : undefined
      });

      tutorialFeedbackOptions.classList.add('u-hide');
      tutorialFeedbackResult.classList.remove('u-hide');
    });
  });
})();

(function() {
  const polls = document.querySelectorAll('.poll');

  [].forEach.call(polls, poll => {
    const answers = poll.querySelectorAll('[type="radio"]');
    const pollId = poll.getAttribute('data-poll-name');

    [].forEach.call(answers, function(answer) {
      answer.addEventListener('change', e => {
        const answerLabel = document.querySelector('label[for="' + e.target.id + '"]');
        const eventLabel = answerLabel.innerText;
        const eventAction = document.getElementById(pollId).innerText;

        dataLayer.push({
          'event' : 'GAEvent',
          'eventCategory' : 'survey',
          'eventAction' : eventAction,
          'eventLabel' : eventLabel,
          'eventValue' : undefined
        });
      });
    });
  });
})();