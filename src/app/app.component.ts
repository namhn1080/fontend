import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState, NoteState } from './states/message.state';
import * as AuthAction from 'src/app/actions/message.action'
import { FormBuilder,FormGroup  } from '@angular/forms';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Message';
  idToken$= this.store.select((state)=>state.auth.idToken);
  form!: FormGroup;
  noteState$ = this.notestore.select('note');
  note$ = this.notestore.select((state) => state.note.notes);
  constructor (
    private store:Store <{auth:AuthState}>,
    private formBuilder: FormBuilder,
    private notestore:Store<{note:NoteState}>,
    private ConnectServerService: MessageService,

    ){ this.form = this.formBuilder.group({
      title: [''],
      description: [''],
    });}
  ngOnInit(): void {
    this.noteState$.subscribe((state) => {
      console.log(state);
    });
    this.notestore.dispatch(AuthAction.getAllNotes());
  }

  login(){
    console.log("click")
    this.store.dispatch(AuthAction.login());
  }


  addNote() {
    console.log('aaaaaaaaa');
    let newForm = {
      ...this.form.value,
    };
    this.notestore.dispatch(AuthAction.addNote({ note: newForm }));
    // this.form.reset(this.form.value);
    this.notestore.dispatch(AuthAction.getAllNotes());
  }
  deleteNote(_id: string) {
    console.log('aaaaaaaaaa');
    this.notestore.dispatch(AuthAction.deleteNote({ _id }));
  }
}


