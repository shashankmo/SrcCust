import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {CategoryPage} from "../category/category";
import {CategoryService} from "../../services/category-service";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // slides for slider
  public slides = [
    "assets/img/categories/fruit.jpg",
    "assets/img/categories/pizza.jpg",
    "assets/img/categories/sushi.jpg"
  ];

  // list of categories
  public categories: any;

  constructor(public nav: NavController, public categoryService: CategoryService) {
    // set data for categories
    this.categories = categoryService.getAll();
  }

  // view a category
  viewCategory(category) {
    this.nav.push(CategoryPage, {category: category});
  }
}
