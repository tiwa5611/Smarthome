import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database'
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NgxGaugeModule } from 'ngx-gauge';

var config = {
  apiKey: "AIzaSyDmWELUeKL8rasJtpjhZhVJpn-cYQYfptw",
  authDomain: "myproject-9dcfb.firebaseapp.com",
  databaseURL: "https://myproject-9dcfb.firebaseio.com",
  projectId: "myproject-9dcfb",
  storageBucket: "myproject-9dcfb.appspot.com",
  messagingSenderId: "285170134214"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    NgxGaugeModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
