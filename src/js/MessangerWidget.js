import { interval, of } from 'rxjs';
import { switchMap, pluck, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import Task from './Task';

export default class MessangerWidget {
  constructor(container, url) {
    this.container = container;
    this.url = url;
  }

  init() {
    this.bindToDOM();
    this.initElements();
    this.registerListeners();
  }

  // eslint-disable-next-line class-methods-use-this
  createHtml() {
    return `
      <div class="manager-box">
        <header class="manager-header">
          <div class="dots">
            <span class="dot dot-1"></span>
            <span class="dot dot-2"></span>
            <span class="dot dot-3"></span>
          </div>
          <h3 class="manager-header_title">Messanger v.1.0</h3>
        </header>

        <section class="manger-main">
          <header class="manger-main_title">Incoming:</header>
          <div class="manager-main_messages">
          </div>
        </section>
      </div>
   `;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('beforeend', this.createHtml());
  }

  registerListeners() {
    interval(10000)
      .pipe(
        switchMap(() => ajax.getJSON(this.url)
          .pipe(            
            pluck('messages'),
            catchError(() => of([])),
          )),
      )
      .subscribe({
        next: (o) => this.makeTasks(o),
        error: null,
        complete: null,
      });
  }

  initElements() {
    this.msgBox = document.querySelector('.manager-main_messages');
  }

  makeTasks(tasks) {
    if (!tasks) return;

    tasks.forEach((task) => new Task(this.msgBox, task));
  }
}
