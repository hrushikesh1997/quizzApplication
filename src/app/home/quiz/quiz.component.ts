import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../Models/quiz';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Question } from '../Models/question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizId:string;
  quiz:Quiz;
  questions: Question[];
  startQuizFlag:boolean;
  currentIndex:number;
  submitText:string;
  solutions:number[];
  optionSelected:number;
  quizCompleteFlag:boolean;
  score:number;
  constructor(private route:ActivatedRoute,private service:FirebaseService,private router: Router) { 
    this.startQuizFlag=false;
    this.currentIndex=0;
    this.submitText="Submit";
    this.optionSelected=-1;
    this.solutions=[];
    this.quizCompleteFlag=false;
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(
      params=>{
        this.quizId=params.get('id');
        if(this.quizId){
          this.service.getQuiz(this.quizId).subscribe( doc => {
            if (doc.exists) {
                this.quiz  = doc.data() as Quiz;
            } else {
              alert("Something went wrong!");
            }
          }, error=>{
            alert("Unable to fetch details :(")
          });
          this.service.getQuestions(this.quizId).subscribe( doc => {
            if (doc.exists) {
                this.questions  = doc.data().questions as Question[];
                for(let q in this.questions){
                  this.solutions.push(-1);
                }
            } else {
              alert("Something went wrong!");
            }
          }, error=>{
            alert("Unable to fetch details :(")
          });
        }
      }
    );
  }
  startQuiz(){
    this.startQuizFlag=true;
  }
  submit(){
    this.solutions[this.currentIndex]=this.optionSelected;
    if(this.submitText==='Finish'){
      this.quizCompleteFlag=true;
      this.score=0;
      for(let index=0; index<this.questions.length; index++){
        if(this.questions[index].solution == this.solutions[index]){
          this.score+=1;
        }
      }
      this.score=(this.score/this.questions.length)*100;
    }
    else if(this.currentIndex<this.questions.length-1){
        this.currentIndex+=1;
        if(this.currentIndex==this.questions.length-1){
          this.submitText="Finish";
        }
        else{
          this.submitText="Submit";
        }
      }
      this.optionSelected=this.solutions[this.currentIndex];
    }
  goNext(){
    this.currentIndex+=1;
    if(this.currentIndex==this.questions.length-1){
      this.submitText="Finish";
    }
    else{
      this.submitText="Submit";
    }
    if(this.solutions[this.currentIndex]>=0){
      this.optionSelected=this.solutions[this.currentIndex];
    }else{
      this.optionSelected=-1;
    }
  }
  goPrev(){
    this.currentIndex-=1;
    this.submitText="Submit";
    if(this.solutions[this.currentIndex]>=0){
      this.optionSelected=this.solutions[this.currentIndex];
    }else{
      this.optionSelected=-1;
    }
  }
  answerSelected(index:number){
    this.optionSelected=index;
  }
  goHome(){
    this.router.navigate(['/home'],{relativeTo:this.route});
  }
}
