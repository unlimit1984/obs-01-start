import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-observable-list',
  templateUrl: './observable-list.component.html',
  styleUrls: ['./observable-list.component.css']
})
export class ObservableListComponent implements OnInit {
  observableList$: Observable<number[]>;

  constructor() {
  }

  ngOnInit() {
    this.observableList$ = of([1, 2, 3, 4]);
  }
}
