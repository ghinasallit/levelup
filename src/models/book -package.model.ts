import {UserModel} from "./user.model";
import {PackageModel} from "./package.model";
import {BookClassModel} from "./book-class.model";

export interface BookPackageModel {
  endDate: Date;
  startDate: Date;
  package: string;
  status: number;
  user: string;
  _id: string;
  userObj: UserModel;
  packageObj: PackageModel;
  bookedClasses: BookClassModel[];
  bookingclasses: BookClassModel[];
}
