import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Quiz } from '../Models/quiz';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss']
})
export class HomeLandingComponent implements OnInit {
  quizList:Quiz[];
  loaderFlag:boolean=true;
  constructor(private router:Router,private route:ActivatedRoute,private service:FirebaseService) { }

  ngOnInit() {
    this.service.getQuizes().subscribe(data => {
      this.quizList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        } as Quiz;
      })
      this.loaderFlag=false;
    });
  }
  onCardClick(quiz:Quiz){    
    this.router.navigate(['quiz'], {queryParams:{id: quiz.id},relativeTo:this.route});
    //alert("Thank you for your interest, We\'re still working on this. :) ");
  }
  onCreateQuiz(){
    this.router.navigate(['createQuiz'], {relativeTo:this.route});
  }
}
