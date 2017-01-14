import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoadingController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { Auth } from './../providers/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage = HomePage;
  rootPage: any;
  loader: any;

  constructor(platform: Platform, public auth: Auth, public loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // Show some activity is ongoing
    this.presentLoading();

    this.auth.login().then((isLoggedIn) => {
      if(isLoggedIn) { // go to homepage
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }

      this.loader.dismiss();
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loader.present();
  }
}
