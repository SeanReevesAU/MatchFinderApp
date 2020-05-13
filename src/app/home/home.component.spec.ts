import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatchService } from '../services/match.service';
import { MatchResponse } from 'src/app/models/MatchResponse';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let matchServiceSpy = jasmine.createSpyObj('MatchService', ['findMatches']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      declarations: [HomeComponent],
      providers: [
        HttpClient,
        { provide: MatchService, useValue: matchServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.errorMessage).toBeUndefined();
    expect(component.showMatchSummary).toBeFalse();
  });

  describe('on successful match call', () => {
    beforeEach(() => {
      var summaryMock: MatchResponse = {
        text: 'test',
        subtext: 'test',
        matches: [1, 2, 3],
      };
      matchServiceSpy.findMatches.and.returnValue(of(summaryMock));
      component.matchfinderForm.get('textControl').setValue('test');
      component.matchfinderForm.get('subtextControl').setValue('test');
      component.onSubmit();
      fixture.detectChanges();
    });

    it('should display success message and correct match summary', () => {
      let element = fixture.debugElement.nativeElement;
      expect(component.errorMessage).toBeNull();
      expect(component.showMatchSummary).toBeTrue();
      expect(element.querySelector('#matchSummary').textContent).toBe(
        ' Successful Match! Subtext was found at: 1,2,3 '
      );
    });

    it('should display no matches found when matches is empty', () => {
      component.matches = [];
      fixture.detectChanges();

      let element = fixture.debugElement.nativeElement;
      expect(component.errorMessage).toBeNull();
      expect(component.showMatchSummary).toBeTrue();
      expect(element.querySelector('#matchSummary').textContent).toBe(
        ' No matches found. '
      );
    });
  });

  describe('on unsuccessful match call', () => {
    beforeEach(() => {
      matchServiceSpy.findMatches.and.returnValue(throwError('oh no!'));
      component.matchfinderForm.get('textControl').setValue('test');
      component.matchfinderForm.get('subtextControl').setValue('test');
      component.onSubmit();
      fixture.detectChanges();
    });

    it('should display error message', () => {
      let element = fixture.debugElement.nativeElement;
      expect(component.errorMessage).toBeDefined();
      expect(component.showMatchSummary).toBeTrue();
      expect(element.querySelector('#matchSummary').textContent).toBe(
        ' Failed to load matches. Please try again later. '
      );
    });
  });
});
