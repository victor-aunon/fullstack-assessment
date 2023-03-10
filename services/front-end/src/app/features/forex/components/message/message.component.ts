import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { AppState, selectMessage } from 'src/app/state';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  message$: Observable<string> = new Observable()

  constructor(private store: Store<AppState>) { 
    this.message$ = this.store.select(selectMessage)
  }

  ngOnInit(): void {
  }

}
