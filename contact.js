document.addEventListener('DOMContentLoaded', function () {
  const emailButton = document.querySelector('.nav-right a[aria-label="Email"]');
  if (!emailButton) return;

  function buildModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.tabIndex = -1;
    overlay.setAttribute('role', 'presentation');

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Contact');

    modal.innerHTML = `
      <div class="modal-header">
        <div class="modal-title">Let's talk.</div>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <div class="modal-body">
        <p>Feel free to reach out to me with any questions or inquiries.</p>
        <p>You can write to me directly at</p>
        <span class="email-line"><a class="mail-link" href="mailto:uchhashay@gmail.com">uchhashay@gmail.com</a></span>
      </div>
      <div class="modal-footer">
        <button class="modal-action">Send Email</button>
      </div>
    `;

    overlay.appendChild(modal);

    // Close helpers
    function closeModal() {
      document.body.removeChild(overlay);
      document.removeEventListener('keydown', onKeyDown);
      emailButton.focus();
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') closeModal();
    }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    modal.querySelector('.modal-close').addEventListener('click', closeModal);

    modal.querySelector('.modal-action').addEventListener('click', function () {
      const email = 'uchhashay@gmail.com';
      const subject = '';
      const body = '';
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      function showCopiedToast() {
        const existing = modal.querySelector('.modal-toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'modal-toast';
        toast.textContent = 'Email copied to clipboard';
        modal.appendChild(toast);
        setTimeout(() => {
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 300);
        }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showCopiedToast();
          const win = window.open(gmailUrl, '_blank');
          if (!win) window.location.href = `mailto:${email}`;
          setTimeout(() => {
            if (document.body.contains(overlay)) document.body.removeChild(overlay);
          }, 400);
        }).catch(() => {
          try {
            const ta = document.createElement('textarea');
            ta.value = email;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
            showCopiedToast();
            const win = window.open(gmailUrl, '_blank');
            if (!win) window.location.href = `mailto:${email}`;
            setTimeout(() => {
              if (document.body.contains(overlay)) document.body.removeChild(overlay);
            }, 400);
          } catch (e) {
            window.location.href = `mailto:${email}`;
          }
        });
      } else {
        try {
          const ta = document.createElement('textarea');
          ta.value = email;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
          showCopiedToast();
          const win = window.open(gmailUrl, '_blank');
          if (!win) window.location.href = `mailto:${email}`;
          setTimeout(() => {
            if (document.body.contains(overlay)) document.body.removeChild(overlay);
          }, 400);
        } catch (e) {
          window.location.href = `mailto:${email}`;
        }
      }
    });

    document.addEventListener('keydown', onKeyDown);

    return overlay;
  }

  emailButton.addEventListener('click', function (e) {
    e.preventDefault();
    // Avoid creating multiple modals
    if (document.querySelector('.modal-overlay')) return;
    const modalEl = buildModal();
    document.body.appendChild(modalEl);
    // focus the close button
    const closeBtn = modalEl.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  });
});
