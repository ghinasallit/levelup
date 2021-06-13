import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CalendarView} from 'angular-calendar';

@Component({
  selector: 'mwl-demo-utils-calendar-header',
  template: `
      <div class="row text-center">
          <div class="col-md-4">
              <div class="btn-group">
                  <div
                          class="btn btn-primary mx-1"
                          mwlCalendarPreviousView
                          [view]="view"
                          [(viewDate)]="viewDate"
                          (viewDateChange)="viewDateChange.next(viewDate)"
                  >
                      {{'_Previous' | translate}}
                  </div>
                  <div
                          class="btn btn-outline-secondary"
                          mwlCalendarToday
                          [(viewDate)]="viewDate"
                          (viewDateChange)="viewDateChange.next(viewDate)"
                  >

                      {{'_Today' | translate}}

                  </div>
                  <div
                          class="btn btn-primary mx-1"
                          mwlCalendarNextView
                          [view]="view"
                          [(viewDate)]="viewDate"
                          (viewDateChange)="viewDateChange.next(viewDate)"
                  >

                      {{'_Next' | translate}}

                  </div>
              </div>
          </div>
          <div class="col-md-4 mx-1">
              <h3>{{ viewDate | calendarDate: view + 'ViewTitle':locale }}</h3>
          </div>
          <div class="col-md-4">
              <!--        <div class="btn-group">-->
              <!--          <div-->
              <!--            class="btn btn-primary"-->
              <!--            (click)="viewChange.emit(CalendarView.Month)"-->
              <!--            [class.active]="view === CalendarView.Month"-->
              <!--          >-->
              <!--            Month-->
              <!--          </div>-->
              <!--          <div-->
              <!--            class="btn btn-primary"-->
              <!--            (click)="viewChange.emit(CalendarView.Week)"-->
              <!--            [class.active]="view === CalendarView.Week"-->
              <!--          >-->
              <!--            Week-->
              <!--          </div>-->
              <!--          <div-->
              <!--            class="btn btn-primary"-->
              <!--            (click)="viewChange.emit(CalendarView.Day)"-->
              <!--            [class.active]="view === CalendarView.Day"-->
              <!--          >-->
              <!--            Day-->
              <!--          </div>-->
              <!--        </div>-->
          </div>
      </div>
      <br/>
  `,
})

export class CalendarHeaderComponent {
  @Input() view: CalendarView;

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
