import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Quiz } from '../home/Models/quiz';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fireStore:AngularFirestore) { }

  getQuizes(){
    return this.fireStore.collection('quizList').snapshotChanges();
  }
  getQuiz(id:string){
    var docRef = this.fireStore.collection("quizList").doc(id);
    return docRef.get();
  }
  getQuestions(id:string){
    var docRef = this.fireStore.collection("quizQuestions").doc(id);
    return docRef.get();
  }
  createQuiz(quiz: any){
    return this.fireStore.collection('quizList').add(quiz);
  }
  addQuestions(questions: any, quizID: string){
    return this.fireStore.collection('quizQuestions').doc(quizID).set(questions);
  }
  updateQuiz(quiz: any){
    this.fireStore.doc('quizList/' + quiz.id).update(quiz);
  }
  deleteQuiz(quizId: string){
    this.fireStore.doc('quizList/' + quizId).delete();
  }
}
