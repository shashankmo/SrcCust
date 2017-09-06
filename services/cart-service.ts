import {Injectable} from "@angular/core";
import {Storage} from '@ionic/storage';

@Injectable()
export class CartService {
  cart = {
    items: [],
    total: 0
  };

  constructor(public storage: Storage) {
  }

  // get all items from cart
  getAll() {
    return this.storage.get('cart');
  }

  // add item to card
  addItem(item, qty, callback) {
    let storage = this.storage;
    // return 0;
    storage.get('cart').then(cart => {
      if (!cart) {
        cart = this.cart;
      }

      // calculate item
      let record = {
        item_id: item.$key,
        name: item.name,
        thumb: item.thumb,
        price: item.price,
        options: [],
        taxes:  item.taxes ? item.taxes : {},
        size: item.size ? item.sizes[item.size] : null,
        quantity: parseInt(qty),
        subtotal: 0
      };

      record.subtotal = parseFloat(record.size ? record.size.price : record.price);

      if (item.options) {
        for (let i = 0; i < item.options.length; i++) {
          if (item.options[i].checked) {
            record.options.push(item.options[i]);
            record.subtotal += parseFloat(record.options[i].price);
          }
        }
      }

      // calculate cart total
      // cart.total += record.subtotal * qty;

      // if item with the size and options already exist => change the qty only
      let itemIndex = -1;
      for (let i = 0; i < cart.items.length; i++) {
        let item = cart.items[i];
        if ((item.item_id == record.item_id) &&
            (item.size == record.size) &&
            (JSON.stringify(item.options) == JSON.stringify(record.options))) {
          itemIndex = i;
        }
      }

      if (itemIndex == -1) {
        cart.items.push(record);
      } else {
        cart.items[itemIndex].quantity += record.quantity;
        cart.items[itemIndex].subtotal += record.subtotal;
      }

      // update cart total price
      cart.total = this.calculateTotalPrice(cart.items);

      storage.set('cart', cart).then(callback(cart));
    });
  }

  // remote item from cart
  removeItem(cart, index) {
    // remote from array
    cart.items.splice(index, 1);

    // calculate price
    cart.total = this.calculateTotalPrice(cart.items);

    // save to storage
    this.storage.set('cart', cart);
  }

  // change item qty
  changeQty(cart) {
    // save to storage
    cart.total = this.calculateTotalPrice(cart.items);
    this.storage.set('cart', cart);
  }

  // calculate total price
  calculateTotalPrice(items) {
    let total = 0;
    let subtotal = 0;

    // calculate price
    items.forEach(item => {
      subtotal = item.subtotal * item.quantity;
      total += subtotal;

      if (item.tax_objects) {
        item.tax_objects.forEach(tax => {
          total += subtotal * tax.rate / 100;
        });
      }
    });

    return total.toFixed(2);
  }

  // clear cart
  clearCart() {
    return this.storage.set('cart', this.cart);
  }
}
