import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage';

// Import the AF2 Module
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

// import services
import {CategoryService} from '../services/category-service';
import {ItemService} from '../services/item-service';
import {CartService} from '../services/cart-service';
import {PostService} from '../services/post-service';
import {ChatService} from '../services/chat-service';
import {NotificationService} from '../services/notification-service';
import {TaxService} from "../services/tax-service";
// end import services

// import pages
import {AboutPage} from '../pages/about/about';
import {AddressPage} from '../pages/address/address';
import {CartPage} from '../pages/cart/cart';
import {CategoriesPage} from '../pages/categories/categories';
import {CategoryPage} from '../pages/category/category';
import {ChatDetailPage} from '../pages/chat-detail/chat-detail';
import {ChatsPage} from '../pages/chats/chats';
import {CheckoutPage} from '../pages/checkout/checkout';
import {FavoritePage} from '../pages/favorite/favorite';
import {HomePage} from '../pages/home/home';
import {ItemPage} from '../pages/item/item';
import {LoginPage} from '../pages/login/login';
import {NewsPage} from '../pages/news/news';
import {OfferPage} from '../pages/offer/offer';
import {RegisterPage} from '../pages/register/register';
import {SettingPage} from '../pages/setting/setting';
import {UserPage} from '../pages/user/user';
import {OrderService} from "../services/order-service";
import {AuthService} from "../services/auth-service";
import {OrdersPage} from '../pages/orders/orders';
import {OrderDetailPage} from '../pages/order-detail/order-detail';
// end import pages

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyD8G9U7stg99CwD0y3EQjjJH5oVMz-z2uw",
    authDomain: "garlex-95dfa.firebaseapp.com",
    databaseURL: "https://garlex-95dfa.firebaseio.com",
    projectId: "garlex-95dfa",
    storageBucket: "garlex-95dfa.appspot.com",
    messagingSenderId: "951138828381"

};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AddressPage,
    CartPage,
    CategoriesPage,
    CategoryPage,
    ChatDetailPage,
    ChatsPage,
    CheckoutPage,
    FavoritePage,
    HomePage,
    ItemPage,
    LoginPage,
    NewsPage,
    OfferPage,
    RegisterPage,
    SettingPage,
    UserPage,
    OrdersPage,
    OrderDetailPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AddressPage,
    CartPage,
    CategoriesPage,
    CategoryPage,
    ChatDetailPage,
    ChatsPage,
    CheckoutPage,
    FavoritePage,
    HomePage,
    ItemPage,
    LoginPage,
    NewsPage,
    OfferPage,
    RegisterPage,
    SettingPage,
    UserPage,
    OrdersPage,
    OrderDetailPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoryService,
    ItemService,
    CartService,
    PostService,
    ChatService,
    OrderService,
    AuthService,
    NotificationService,
    TaxService,
    /* import services */
  ]
})
export class AppModule {
}
