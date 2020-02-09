import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './Models/User';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    )
  }
  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }
  updateUserData(user:User) {
    const userRef : AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid:user.uid,
      email:user.email,
      displayName:user.displayName,
      photoURL:user.displayName
    };
    return userRef.set(data, { merge:true })
  } 
  async logout(){
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }
}
