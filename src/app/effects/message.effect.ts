import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import { MessageService } from "../services/message.service";
import * as AuthAction from "../actions/message.action"
import { catchError, map, switchMap, from} from "rxjs";
import {of} from 'rxjs'




@Injectable()
export class AuthEffects {
    constructor(private action$: Actions,private messService: MessageService) { }
    authEffects$ = createEffect(()=>this.action$.pipe(
    ofType(AuthAction.login),
    switchMap(()=>this.messService.login()),
    map(idToken=>AuthAction.loginSucces({idToken:idToken})),
    catchError(error=> of(AuthAction.loginFail({error: error})))
    ))
    // authEffect$ = createEffect(()=>this.action$.pipe(
    //         ofType(AuthAction.login),
    //         switchMap(()=>this.messService.login()),
    //         map(idToken=>AuthAction.loginSucces({ idToken:idToken})),
    //         catchError(error => of(AuthAction.loginFail({error: error})))
    //         ))

    addNote$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthAction.addNote),
      switchMap((action) => from(this.messService.addNote(action.note))),
      map(() => AuthAction.addNoteSuccess()),
      catchError((error) => of(AuthAction.addNoteFail({ error: error })))
    )
  );

  getAllNotes$ = createEffect(() =>
  this.action$.pipe(
    ofType(AuthAction.getAllNotes),
    switchMap(() => this.messService.getAllNotes()),
    map((notes) => AuthAction.getAllNotesSuccess({ notes })),
    catchError((error) => of(AuthAction.getAllNotesFail({ error: error })))
  )
);
deleteNote$ = createEffect(() =>
this.action$.pipe(
  ofType(AuthAction.deleteNote),
  switchMap((action) => from(this.messService.deleteNote(action._id))),
  map(() => AuthAction.deleteNoteSuccess()),
  catchError((error) => of(AuthAction.deleteNoteFail({ error: error })))
)
);

updateNote$ = createEffect(() =>
this.action$.pipe(
  ofType(AuthAction.updateNote),
  switchMap((action) => from(this.messService.updateNote(action.note))),
  map(() => AuthAction.updateNoteSuccess()),
  catchError((error) => of(AuthAction.updateNoteFail({ error: error })))
)
);

    
}