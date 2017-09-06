import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {ItemService} from "./item-service";

@Injectable()
export class TaxService {
  private taxes: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase, public itemService: ItemService) {
    this.taxes = db.list('/taxes');
  }

  getAll() {
    return this.taxes;
  }

  // find record by id
  getRecord(id) {
    return this.db.object('/taxes/' + id);
  }
}
