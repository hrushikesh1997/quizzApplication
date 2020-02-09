import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Question } from '../Models/question';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  authorName:string='Fetching User Details...';
  options: string[];
  optionText: string;
  createQuizForm:FormGroup;
  addQuestionForm:FormGroup;
  showQuestionForm:boolean;
  answerOption:number;
  questionList:Question[];
  constructor(private service:FirebaseService,private auth:AuthService,private formBuilder:FormBuilder) {
    this.options=[];
    this.questionList=[];
    this.answerOption=-1;
   }

  ngOnInit() {
    this.createQuizForm = this.formBuilder.group(
      {
        quizName:['',Validators.required],
        quizDescription:['',Validators.required],
        author:['',Validators.required]
      }
    )
    this.addQuestionForm = this.formBuilder.group(
      {
        questionText:['',Validators.required],
        options:[[],Validators.required],
        solution:['',Validators.required]
      }
    )
    this.auth.user$.subscribe(
      user=>{
        this.authorName=user?user.displayName:'Anonymous User';
        this.createQuizForm.get('author').setValue(this.authorName);
      },error=>{
        this.authorName='Anonymous User';
        this.createQuizForm.get('author').setValue(this.authorName);
      }
    )
  }
  addOption(optionText:string){
    if(optionText){
      this.options.push(optionText);
      this.addQuestionForm.get('options').setValue(this.options)
    }else{
      alert("Empty options are disabled intentinally, Please contact system administrator for more details.")
    }
  }
  deleteOption(index:number){
    if(index >=0 && index===this.answerOption){
      if(index==0 && this.options.length > 1){
        this.options.splice(index,1);
        return;
      }
      else{
          this.answerOption=-1;
      }
    }
    this.options.splice(index,1);
  }
  answerSelected(option:number){
    this.answerOption=option;
    this.addQuestionForm.get('solution').setValue(this.answerOption);
  }
  showAddQuestion(){
    this.showQuestionForm=!this.showQuestionForm;
    this.resetQuestionForm();
  }
  resetQuestionForm(){
    this.addQuestionForm.reset();
    this.answerOption=-1;
    this.options = [];
  }
  addQuestion(){
    this.questionList.push(this.addQuestionForm.value);
    this.resetQuestionForm();
  }
  deleteQuestion(index:number){
    this.questionList.splice(index,1);
  }
  createQuiz()
  {
    this.service.createQuiz(this.createQuizForm.value).then(
      response=>{
        this.service.addQuestions({questions : this.questionList}, response.id).then(
          response=>{
            alert("Quiz Added Successfully! Find your new quiz on home page.");
            this.showQuestionForm=false;
            this.resetQuestionForm();
            this.questionList=[];
            this.createQuizForm.reset();
          },responseError=>{
            console.error("Something went wrong while adding questions")
          }
        );
      },responsError=>{
        alert("Something went wrong! Please try after sometime. ")
      }
    )
  }
}
