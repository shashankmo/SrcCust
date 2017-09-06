import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {CartService} from '../../services/cart-service';
import {CheckoutPage} from "../checkout/checkout";
import {Storage} from '@ionic/storage';
import {TaxService} from "../../services/tax-service";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  // cart data
  public cart = {
    items: [],
    total: 0
  };

  constructor(public nav: NavController, public cartService: CartService, public storage: Storage,
              public taxService: TaxService) {
    cartService.getAll().then((data) => {
      console.log(data);
      if (data) {
        // clean tax_objects of items
        data.items.map(item => {
          item.tax_objects = [];
        });

        // add tax object to each item
        let subscription = taxService.getAll().subscribe(snapshot => {
          subscription.unsubscribe();

          snapshot.forEach(tax => {
            // if this tax is enabled
            if (tax.enable) {
              for(let i = 0; i < data.items.length; i++) {
                // if this item is applied for this taxes
                if (tax.apply_items && (tax.apply_items.indexOf(data.items[i].item_id) > -1)) {
                  if (data.items[i].tax_objects) {
                    data.items[i].tax_objects.push(tax);
                  }
                }
              }
            }
          });
          data.total = cartService.calculateTotalPrice(data.items);
          this.cart = data;
        });
      }
    });
  }

  // plus quantity
  plusQty(item) {
    item.quantity++;
    this.cartService.changeQty(this.cart);
  }

  // minus quantity
  minusQty(item) {
    if (item.quantity > 1) {
      item.quantity--;
    }
    this.cartService.changeQty(this.cart);
  }

  // remove item from cart
  remove(index) {
    this.cartService.removeItem(this.cart, index);
  }

  // click buy button
  buy() {
    this.nav.push(CheckoutPage, {cart: this.cart});
  }
}
