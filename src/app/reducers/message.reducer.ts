import { createReducer, on } from "@ngrx/store";
import { AuthState, NoteState } from "../states/message.state";
import * as AuthAction from "../actions/message.action"



const initialState: AuthState={
isLoading: false,
idToken: "",
error:""
}
const noteState: NoteState={
  notes: [],
  error: '',
  isLoading: false,

}

export const authReducer = createReducer(initialState,
    on(AuthAction.login, state=>state),
    on(AuthAction.loginSucces,(state,action)=>({...state,isLoading: true,idToken:action.idToken })),
    on(AuthAction.loginFail,(state, action)=>({...state, error: action.error})),
)

export const noteReducer = createReducer(noteState,
    //POST
    on(AuthAction.addNote, state =>({
        ...state,
        isLoading: true,
    })),
    on(AuthAction.addNoteSuccess, state =>({
        ...state,
        isLoading: false,
    })),
    on(AuthAction.addNoteFail, (state,{error}) =>({
        ...state,
        isLoading: false,
        error: error,
    })),

    //GET
    on(AuthAction.getAllNotes, state => ({
          ...state,
          isLoading: true, 
      })),
      on(AuthAction.getAllNotesSuccess, (state, {notes}) =>({
        ...state,
        isLoading: false,
        error: "",
        notes: notes
    })),

    on(AuthAction.getAllNotesFail, (state, {error}) =>({
        ...state,
        isLoading: false,
        error: error
    })),
    //DELETE

    on(AuthAction.deleteNote, state =>({
        ...state,
        isLoading: true,
  
    })),
    on(AuthAction.deleteNoteSuccess, (state)=>({
        ...state,
        isLoading: false,
        
    })),
    on(AuthAction.deleteNoteFail,(state, {error}) =>({
        ...state,
        isLoading: false,
        error: error,
    })),

    //UPDATE
    on(AuthAction.updateNote, (state) => {
        return { ...state, isLoading: true };
      }),
      on(AuthAction.updateNoteSuccess, (state) => ({
        ...state,
        isLoading: true,
      })),
      on(AuthAction.updateNoteFail, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error,
        isSuccess: true,
      })),
);

    
