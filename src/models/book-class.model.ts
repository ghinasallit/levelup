import {ScheduleModel} from "./schedule.model";

export class BookClassModel {
  _id: string;
  bookingPackages: string;
  schedule: string;
  dateTime: Date;
  scheduleObj: ScheduleModel;
  status: string;

}
