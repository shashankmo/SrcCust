import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import 'rxjs/add/operator/map';
import {AuthService} from "./auth-service";

@Injectable()
export class OrderService {
  private orders: FirebaseListObservable<any>;
  private userId: any;

  constructor(public db: AngularFireDatabase, public authService: AuthService) {}

  // get all records
  getAll() {

    let user = this.authService.getUserData();
    this.orders = this.db.list('/orders/' + user.uid);

    return this.orders.map(arr => {
      return arr.reverse();
    });
  }

  // add record
  addRecord(items, address) {
    let order = {
      address: address,
      items: []
    };

    items.forEach(item => {
      order.items.push({
        item_id: item.item_id,
        name: item.name,
        options: item.options,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        thumb: item.thumb,
      });
    });

    this.getAll();
    this.orders.push(order);
  }

  // find record by id
  getRecord(id) {
    return this.db.object('/orders/' + this.userId + '/' + id);
  }
}
