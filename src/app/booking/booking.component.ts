import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {colors} from "../../components/utils-calender-header/colors";
import {isSameDay, isSameMonth} from "date-fns";
import {AppService} from "../app.service";
import {DataService} from "../../services/data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Paginations, ScheduleBooking} from "../../models/paginations";
import {BookPackageModel} from "../../models/book -package.model";
import {ScheduleModel} from "../../models/schedule.model";
import {DatePipe} from "@angular/common";
import {CategoryModel} from "../../models/category.model";
import {BookClassModel} from "../../models/book-class.model";
import {ToastrService} from "ngx-toastr";


interface Film {
  color: string;
  title: string;
  release_date: string;
  start: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [DatePipe]

})

export class BookingComponent implements OnInit {

  categories: CategoryModel[] = [];
  view: CalendarView = CalendarView.Month;
  pagination = new Paginations();
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;
  myPackages: BookPackageModel[] = [];
  schedules: ScheduleModel[] = [];
  data: ScheduleModel[] = [];
  package: BookPackageModel;
  curr = new Date;
  bookClass = new BookClassModel();
  isgetShedule = false;

  constructor(public appService: AppService,
              public datepipe: DatePipe,
              private toastr: ToastrService,
              private restService: DataService) {
    this.pagination.page = 0;
    this.pagination.limit = 6;

    this.events = [];
  }

  eventClicked({event}: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }


  getMyPackages() {
    this.restService.getMyPackages(this.pagination).then((res) => {
      this.myPackages = res.results;
      this.myPackages.forEach(item => {
        item.bookingclasses = item.bookingclasses.filter(data => +data.status !== 1);
      });
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        // this.toastr.error(err.error.message);
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  getUserCategories() {
    this.restService.getUserCategories().then((res) => {
      this.categories = res.results;
      this.pagination.id = this.categories[0]._id;
      this.getMyPackages();
      this.getSchedule();

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        // this.toastr.error(err.error.message);
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  bookClasses(eventItem) {
    this.restService.bookClass(this.bookClass).then((res) => {
      const eventIndex = this.events.indexOf(eventItem);
      this.events[eventIndex].actions[0] = {
        label: '<i class="fa fa-check-circle" aria-hidden="true"></i> Booked',
        onClick: ({event}: { event: CalendarEvent }): void => {
        },
      },
        this.events[eventIndex].color = colors.blue;
      this.package.bookingclasses.push(res);
      let packages: BookPackageModel[] = this.myPackages.filter(item => item.package === res.bookingPackages);
      let index = this.myPackages.indexOf(packages[0]);
      this.myPackages[index].bookingclasses.length = this.myPackages[index].bookingclasses.length + 1;
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message);
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }


  getDate(date, item: ScheduleModel) {
    var dayOfWeek = item.dayObj.numberOfDays;
    date = new Date(date.setDate(date.getDate() - date.getDay() + dayOfWeek));
    let endDate = this.datepipe.transform(this.package.endDate, 'MM/dd/yyyy');
    date = new Date(date.setDate(date.getDate() - date.getDay() + (dayOfWeek + 7)));
    if (new Date(this.datepipe.transform(date, 'MM/dd/yyyy')) <= new Date(endDate)) {
      let eventItem: CalendarEvent = {
        title: this.datepipe.transform(item.startTime, 'hh:mm a') + '-' + this.datepipe.transform(item.endTime, 'hh:mm a') + ', Coach: ' + item.trainer_name,
        color: colors.yellow,
        start: date,
        // actions: [
        //   {
        //     label: '<i class="fa fa-tag" aria-hidden="true"></i> Book Now',
        //     onClick: ({event}: { event: CalendarEvent }): void => {
        //       this.bookClass.bookingPackages = this.package._id;
        //       this.bookClass.dateTime = event.start;
        //       this.bookClass.schedule = item._id;
        //       this.bookClasses(event);
        //     },
        //   },
        // ],
      };

      this.events.push(eventItem);
      // if (this.package.bookingclasses.length) {
      //   this.package.bookingclasses.forEach(data => {
      //     if ((this.datepipe.transform(data.dateTime) , 'MM/dd/yyyy') == (this.datepipe.transform(date) , 'MM/dd/yyyy') &&
      //       (this.datepipe.transform(data.scheduleObj.startTime, 'hh:mm a') == this.datepipe.transform(item.startTime, 'hh:mm a')) &&
      //       (this.datepipe.transform(data.scheduleObj.endTime, 'hh:mm a') == this.datepipe.transform(item.endTime, 'hh:mm a')) && data.status == '0') {
      //       let index = this.events.indexOf(eventItem);
      //       this.events[index].actions[0] = {
      //         label: '<i class="fa fa-check-circle" aria-hidden="true"></i> Booked',
      //         onClick: ({event}: { event: CalendarEvent }): void => {
      //         }
      //       }
      //       this.events[index].color = colors.blue;
      //     }
      //   });
      // }
      this.getDate(date, item);
    }
  }


  getScheduleDetails(data, item: BookPackageModel) {
    let schedule = new ScheduleBooking();
    schedule.date = data.date;
    schedule.day = data.day;
    schedule.category = this.pagination.id;
    schedule.package = item._id;
    this.getScheduleBooking(schedule);
  }


  getScheduleBooking(schedule) {
    this.restService.getScheduleBooking(schedule).then((res) => {
      this.data = res.results;
      if (this.data.length) {
        const eventIndex = this.events.filter(item => (this.datepipe.transform(item.start, 'MM/dd/yyyy')) == (this.datepipe.transform(schedule.date, 'MM/dd/yyyy')));
        eventIndex.forEach(event => {
          this.events = this.events.filter(item => item != event);
        });

        this.data.forEach(date => {
          let eventItem: CalendarEvent;
          if (date.limit) {
            if (date.isAlreadyBooked) {
              eventItem = {
                title: this.datepipe.transform(date.startTime, 'hh:mm a') + '-' + this.datepipe.transform(date.endTime, 'hh:mm a') + ', Coach: ' + date.trainer_name + '   ',
                color: colors.blue,
                start: schedule.date,
                actions: [
                  {
                    label: '<i class="fa fa-check-circle" aria-hidden="true"></i> Booked',
                    onClick: ({event}: { event: CalendarEvent }): void => {
                    },
                  },
                ],
              };
            } else {
              eventItem = {
                title: this.datepipe.transform(date.startTime, 'hh:mm a') + '-' + this.datepipe.transform(date.endTime, 'hh:mm a') + ', Coach: ' + date.trainer_name + '   ',
                color: colors.red,
                start: schedule.date,
                actions: [
                  {
                    label: '<i class="fa fa-times-circle" aria-hidden="true"></i> Completed',
                    onClick: ({event}: { event: CalendarEvent }): void => {
                    },
                  },
                ],
              };
            }

          } else {
            if (date.isAlreadyBooked) {
              eventItem = {
                title: this.datepipe.transform(date.startTime, 'hh:mm a') + '-' + this.datepipe.transform(date.endTime, 'hh:mm a') + ', Coach: ' + date.trainer_name + '   ',
                color: colors.blue,
                start: schedule.date,
                actions: [
                  {
                    label: '<i class="fa fa-check-circle" aria-hidden="true"></i> Booked',
                    onClick: ({event}: { event: CalendarEvent }): void => {
                    },
                  },
                ],
              };
            } else {
              eventItem = {
                title: this.datepipe.transform(date.startTime, 'hh:mm a') + '-' + this.datepipe.transform(date.endTime, 'hh:mm a') + ', Coach: ' + date.trainer_name + '   ',
                color: colors.yellow,
                start: schedule.date,
                actions: [
                  {
                    label: '<i class="fa fa-tag" aria-hidden="true"></i> Book Now',
                    onClick: ({event}: { event: CalendarEvent }): void => {
                      this.bookClass.bookingPackages = this.package._id;
                      this.bookClass.dateTime = event.start;
                      this.bookClass.schedule = date._id;
                      this.bookClasses(event);
                    },
                  },
                ],
              };
            }

          }
          this.events.push(eventItem);

        });
      }

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        // this.toastr.error(err.error.message);
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }


  openCalender() {
    console.log(this.package);
    this.events = [];
    // var date = new Date();
    // this.getDate(date, this.schedules[0]);
    this.schedules.forEach(item => {
      var date = new Date();
      this.getDate(date, item);
    });
  }

  getSchedule() {
    this.restService.getSchedule(this.pagination.id).then((res) => {
      this.schedules = res.results;
      this.isgetShedule = true;
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        // this.toastr.error(err.error.message);
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }


  ngOnInit() {
    this.getUserCategories();


  }


  dayClicked({
               date,
               events,
             }
               :
               {
                 date: Date;
                 events: CalendarEvent<{ film: Film }> [];
               }
  ):
    void {
    if (isSameMonth(date, this.viewDate)
    ) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }

  }

}
