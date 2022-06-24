import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  onboardingQuestions = [
    'Have you ever coded with HTML and CSS?',
    'Would you like to refresh your knowledge or are you looking for learning new things?'
  ]

  isBeginner = true;

  constructor(
    private readonly router: Router,
    private cookieService: CookieService,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    if (this.cookieService.get('isOnboarded') === 'true') {
      this.sharedService.startingChapter = 1;
      this.goToGame();
    }
  }

  public goBeginner() {
    this.sharedService.startingChapter = 1;
    this.goToGame();
  }

  public goSecondQuestion() {
    this.isBeginner = false;
  }

  public secondQuestionEval(status: boolean) {
    if (status) {
      this.sharedService.startingChapter = 3;
      this.goToGame();
    } else  {
      this.sharedService.startingChapter = 2;
      this.goToGame();
    }
  }

  public goToGame() {
    this.router.navigate(['/slate']);
  }

}
