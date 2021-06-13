import {CategoryModel} from "./category.model";

export class PackageModel {
  active: string;
  category: string;
  classes_count: number;
  price: number;
  validity: number;
  _id: string;
  alreadyBooked: boolean;
  renewable: boolean;
  categoryObj: CategoryModel;
}
