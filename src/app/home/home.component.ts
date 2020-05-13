import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  matches: number[];
  errorMessage: string;
  showMatchSummary = false;

  matchfinderForm = new FormGroup({
    textControl: new FormControl('', [Validators.required]),
    subtextControl: new FormControl('', [Validators.required]),
  });

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const text = this.matchfinderForm.get('textControl').value;
    const subtext = this.matchfinderForm.get('subtextControl').value;
    this.showMatchSummary = false;
    this.matchService.findMatches(text, subtext).subscribe(
      (res) => {
        this.matches = res.matches;
        this.showMatchSummary = true;
        this.errorMessage = null;
      },
      (err) => {
        console.log(err);
        this.errorMessage = 'Failed to load matches. Please try again later.';
        this.showMatchSummary = true;
      }
    );
  }

  getMatchSummary() {
    if (this.errorMessage) {
      return this.errorMessage;
    }

    if (this.matches.length > 0) {
      return (
        'Successful Match! Subtext was found at: ' + this.matches.toString()
      );
    }

    return 'No matches found.';
  }
}
