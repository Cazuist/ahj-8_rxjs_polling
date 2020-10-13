import moment from 'moment';

export default class Task {
  constructor(container, {
    id, from, subject, body,
  }) {
    this.container = container;
    this.id = id;
    this.email = from;
    this.subject = subject;
    this.content = body;
    this.date = moment().format('hh:mm DD.MM.YY');

    this.bindToDOM();
  }

  // eslint-disable-next-line class-methods-use-this
  createHtml() {
    return `
      <div class="manager-task" data-id=${this.id}>
        <div class="task-email">${this.email}</div>
        <div class="task-subject">${this.formatSubject(this.subject)}</div>
        <div class="task-date">${this.date}</div>
      </div>
    `;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('afterbegin', this.createHtml());
  }

  // eslint-disable-next-line class-methods-use-this
  formatSubject(string) {
    const str = string.trim();

    if (str.length > 15) {
      return `${str.slice(0, 14)}...`;
    }

    return str;
  }
}
