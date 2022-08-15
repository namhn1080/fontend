
import { createAction, props } from "@ngrx/store";
import { Note } from "../models/note.model";

//login
export const login = createAction ('[Auth] Login');
export const loginSucces = createAction('[Auth] LoginSuccess',props<{idToken: string}>())
export const loginFail = createAction('[Auth] Login',props<{error: string}>());
//Post
export const addNote = createAction ('[Note] Add',props<{note:Note }>());
export const addNoteSuccess = createAction('[Note] Add Success');
export const addNoteFail = createAction('[Note] Add Fail',props<{error: string}>());

//GET
export const getAllNotes = createAction('[Note] Get All Notes');
export const getAllNotesSuccess = createAction('[Note] Get All Notes Success',props<{ notes: Note[] }>());
export const getAllNotesFail = createAction('[Note] Get All Notes Fail',props<{ error: string }>());
//DELTE
export const deleteNote = createAction('[Note] Delete Note',props<{ _id: string }>())
export const deleteNoteSuccess = createAction('[Note] Delete Note Success');
export const deleteNoteFail = createAction('[Note] Delete Note Fail',props<{ error: string }>());  
  //PUT
export const updateNote = createAction('[Note] Update Note',props<{ note: Note }>());
export const updateNoteSuccess = createAction('[Note] Update Note Success');
export const updateNoteFail = createAction('[Note] Update Note Fail',props<{ error: string }>());

