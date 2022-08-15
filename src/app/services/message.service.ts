import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private auth:Auth, private http:HttpClient) { }

  login(){
    return from(new Promise<string>(async(resolve, reject)=>{
        try{
          let credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
          let idToken = await credential.user.getIdToken();
          resolve(idToken);
          console.log(idToken)
        }
        catch{
          reject("Cannot login with Google");
        }
    }));
  }


//////////////////////////////////////////////HTTP??????????//////////////////////

getAllNotes(): Observable<Note[]> {
  return this.http.get<Note[]>(`http://localhost:3000/messages/all`);
}
getNoteById(id: string): Observable<Note[]> {
  return this.http.get<Note[]>(`http://localhost:3000/messages/?id=${id}` + id);
}
addNote(note: Note): Observable<Note[]> {
  return this.http.post<Note[]>(`http://localhost:3000/messages/`, note);
}
updateNote(note: Note): Observable<Note[]> {
  return this.http.put<Note[]>(`http://localhost:3000/messages/`, note);
}
deleteNote(id: string): Observable<Note[]> {
  return this.http.delete<Note[]>(`http://localhost:3000/messages/?id=` + id);
}


}
