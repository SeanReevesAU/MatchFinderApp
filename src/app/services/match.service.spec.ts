import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { MatchService } from './match.service';

describe('FindMatchService', () => {
  let service: MatchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    service = TestBed.get(MatchService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findMatches()', () => {
    service.findMatches('test', 'test').subscribe();
    const req = httpMock.expectOne(
      'https://matchfinderapi.azurewebsites.net/match'
    );
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });
});
