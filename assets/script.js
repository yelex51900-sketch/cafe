(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#global-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
      nav.classList.toggle('is-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'メニューを開く');
      nav.classList.remove('is-open');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'メニューを開く');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }
  const dateInput = document.querySelector('#visit-date');
  if (dateInput) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localDate;
  }
  const form = document.querySelector('#reservation-form');
  if (form) {
    const message = document.querySelector('#form-message');
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const date = String(data.get('date') || '');
      const time = String(data.get('time') || '');
      const day = new Date(`${date}T12:00:00`).getDay();
      if (day === 1) {
        message.textContent = '月曜日は定休日です。別の日付をお選びください。';
        document.querySelector('#visit-date').focus();
        return;
      }
      if (date && date < dateInput.min) {
        message.textContent = '過去の日付は選択できません。';
        dateInput.focus();
        return;
      }
      const summary = `【デモ予約内容】\nお名前：${data.get('name')}\nメール：${data.get('email')}\n日時：${date} ${time}\n人数：${data.get('guests')}名\nご要望：${data.get('note') || 'なし'}\n\nこれはデモ表示です。予約情報は送信・保存されていません。`;
      message.textContent = summary;
      message.style.whiteSpace = 'pre-line';
      message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
})();
