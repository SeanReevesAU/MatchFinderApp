import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatchRequest } from 'src/models/MatchRequest';
import { MatchResponse } from 'src/models/MatchResponse';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private http: HttpClient) {}

  findMatches(text: string, subtext: string) {
    var body: MatchRequest = {
      text: text,
      subtext: subtext,
    };
    return this.http.post<MatchResponse>(
      'https://matchfinderapi.azurewebsites.net/match',
      body
    );
  }
}
