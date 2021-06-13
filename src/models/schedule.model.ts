import {CategoryModel} from "./category.model";

export interface ScheduleModel {
  active: number;
  category: string;
  categoryObj: CategoryModel;
  day: string;
  endTime: string;
  startTime: string;
  trainer_name: string;
  _id: string;
  limit?: boolean;
  isAlreadyBooked?: boolean;
  dayObj: DayModel;
}


export interface DayModel {
  numberOfDays: number;
  title: string;
  _id: string;
}


