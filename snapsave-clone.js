(function () {
  var root = document.querySelector('.ss-clone');
  if (!root) return;

  var menuButton = root.querySelector('.ss-menu-toggle');
  var nav = root.querySelector('#ss-nav');
  var form = root.querySelector('#ss-download-form');
  var status = root.querySelector('#ss-status');
  var input = root.querySelector('#ss-video-url');

  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
  }

  root.querySelectorAll('.ss-dropdown > button').forEach(function (button) {
    button.addEventListener('click', function () {
      var dropdown = button.parentElement;
      var isOpen = dropdown.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });

  function isFacebookUrl(value) {
    try {
      var url = new URL(value);
      return /(^|\.)facebook\.com$/.test(url.hostname) || /(^|\.)fb\.watch$/.test(url.hostname);
    } catch (error) {
      return false;
    }
  }

  function showMessage(message, type) {
    status.innerHTML = '<div class="ss-status-card ss-status-' + type + '">' + message + '</div>';
  }

  if (form && status && input) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var value = input.value.trim();
      if (!isFacebookUrl(value)) {
        showMessage('Please paste a valid Facebook video URL.', 'error');
        return;
      }

      showMessage('Processing video link...', 'loading');

      window.setTimeout(function () {
        status.innerHTML = [
          '<div class="ss-status-card ss-status-success">',
          '<strong>Success! Choose a demo quality below.</strong>',
          '<div class="ss-quality-list">',
          '<div class="ss-quality-row"><span>MP4 1080p</span><a href="#" aria-label="Demo download 1080p">Download</a></div>',
          '<div class="ss-quality-row"><span>MP4 720p</span><a href="#" aria-label="Demo download 720p">Download</a></div>',
          '<div class="ss-quality-row"><span>MP4 360p</span><a href="#" aria-label="Demo download 360p">Download</a></div>',
          '</div>',
          '</div>'
        ].join('');
      }, 700);
    });
  }
}());
