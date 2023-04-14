import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angularQuestionThree';

  counter: number = 0;

  formToggle = new FormGroup({
    activated: new FormControl(true),
  });

  ngOnInit(): void {
    this.getCounterLocalStorage();
  }

  getCounterLocalStorage() {
    let counterLocalStorage = Number(localStorage.getItem('counter'));

    if (counterLocalStorage) {
      this.counter = counterLocalStorage;
    }
  }

  addOne() {
    this.counter++;
    if (this.formToggle.value.activated) {
      localStorage.setItem('counter', String(this.counter));
    }
  }

  reset() {
    this.counter = 0;
    localStorage.setItem('counter', String(this.counter));
  }

  deactivateLocalStorage() {
    this.formToggle.value.activated = !this.formToggle.value.activated;
    if (!this.formToggle.value.activated) {
      this.counter = 0;
    } else {
      this.getCounterLocalStorage();
    }
  }
}
