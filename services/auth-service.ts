import {Injectable} from "@angular/core";
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/take'

@Injectable()
export class AuthService {
  user: any;
  defaultAvatar = 'https://freeiconshop.com/wp-content/uploads/edd/person-outline-filled.png';

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public storage: Storage) {
  }

  // get current user data from firebase
  getUserData() {
    return this.afAuth.auth.currentUser;
  }

  // update user data
  updateUserData(user) {
    let object = this.db.object('users/' + user.uid);
    object.update({
      displayName: user.displayName,
      photoURL: user.photoURL
    });
  }

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(user => {
      // if user info is empty
      if (!user.displayName || !user.photoURL) {
        this.updateUserProfile(user);
      }
    });
  }

  loginWithFacebook() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(result => {
      this.user = result.user;
    }).catch((error: any) => {
      console.log(error);
    });
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
      this.user = result.user;
    }).catch((error: any) => {
      console.log(error);
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  register(email, password) {
    return Observable.create(observer => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((authData: any) => {
        this.updateUserProfile(authData);
        observer.next();
      }).catch((error: any) => {
        if (error) {
          observer.error(error);
        }
      });
    });
  }

  // update user display name and photo
  updateUserProfile(user) {
    this.getUserData().updateProfile({
      displayName: user.displayName ? user.displayName : user.email,
      photoURL: user.photoURL ? user.photoURL : this.defaultAvatar
    });
  }
}
