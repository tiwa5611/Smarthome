import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';

import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database'
import {models} from '../../Models/model.intergace'
import firebase from 'firebase';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  //--------button1--------//
  bgColor1:string = "light";
  sButton1:boolean;
  icColor1:string = "dark";
  //--------button2--------//
  bgColor2:string = "light";
  sButton2:boolean;
  icColor2:string = "dark";
  //--------button3--------//
  bgColor3:string = "light";
  sButton3:boolean;
  icColor3:string = "dark";

  statusled:FirebaseListObservable<models[]>
  statussensorMQ2:FirebaseListObservable<models[]>
  statussensorDHT22:FirebaseListObservable<models[]>

  led:models[];
  sensormq2:models[];
  sensordht22:models[];


  sensorDHT22:any;   //show in html
  sensorMQ2:any;    //show in html

  statusAlert:number = 1;
  statusIndex:number = 0;


  sensorValue:any;
  sensorValuetem:number;
  sensorValueMQ:number;
  data:string;


  constructor(public navCtrl: NavController,
              private datafire:AngularFireDatabase,
              private localNotifications:LocalNotifications,
              private platform:Platform,
              private alertCrt:AlertController) {

    this.statusled = datafire.list('home/led');
    this.statussensorMQ2 = datafire.list('home/sensor/mq2');
    this.statussensorDHT22 = datafire.list('home/sensor/dht22');

   console.log(".....................................");            
    this.statusled.subscribe((Item)=>{
      this.led = Item;
      console.log("Data LED stastus :",this.led);
      this.initialButtonState(this.led);
    });
    console.log("................////////////// DHT22 ////////////////////....................");   
    this.statussensorDHT22.subscribe((Item) =>{
      this.sensordht22 = Item;
      //console.log("Data DHT22 sensor status :",this.sensordht22);
      this.sensorValuetem = this.setsensorValueDHT22(this.sensordht22)

      if(this.sensorValuetem > 70){
        if(this.statusIndex == 0){
          console.log(" -------------- first loop ---------------");
          if(this.statusAlert == 1){ 
            this.statusAlert = 0; 
            this.statusIndex = 1;
            console.log("------- flag statusAlert  in if ------",this.statusAlert);  

            let date = new Date(new Date().getTime()+1000);
            console.log(" -------------- time of first loop ---",date);
            this.notificationTem(date); 
            console.log("------- first loop 111111 ------");
          }else{
            console.log("------- else flag ------")
          }
        }else{
          console.log(" -------------- second loop ---------------");
          if(this.statusAlert == 1){ 
            this.statusAlert = 0; 
            this.statusIndex = 1;
          console.log("------- flag statusAlert  in if ------",this.statusAlert);  

            let date = new Date(new Date().getTime()+1000);
            console.log(" -------------- time of second loop ---",date);
            this.notificationTem(date); 
            console.log("------- first loop 111111 ------");
          }else{
            console.log("------- else flag ------")
          }
          
        }           
}else{
  this.statusIndex = 0; 
  console.log("------- else loop ------");
}
    }); 

    console.log("................./////////////// MQ-2 ////////////////////...................");
    this.statussensorMQ2.subscribe((Item)=>{
      this.sensormq2 = Item;
      //console.log("Data MQ-2 sensor status :",this.sensormq2);
      this.sensorValueMQ = this.setsensorValueMQ2(this.sensormq2);
        console.log("------- Status value statusAlert out if ------", this.statusAlert);
        console.log("------- flag status index ------", this.statusIndex);  
        console.log("------- flag statusAlert ------", this.statusAlert);
          if(this.sensorValueMQ > 750){
                if(this.statusIndex == 0){
                  console.log(" -------------- first loop ---------------");
                  if(this.statusAlert == 1){ 
                    this.statusAlert = 0; 
                    this.statusIndex = 1;//
                  console.log("------- flag statusAlert  in if ------", this.statusAlert);  

                    let date = new Date(new Date().getTime()+1000);
                    console.log(" -------------- time of first loop ---",date);
                    this.notification(date); 
                    console.log("------- first loop 111111 ------");
                  }else{
                    console.log("------- else flag ------")
                  }
                }else{
                  console.log(" -------------- second loop ---------------");
                  if(this.statusAlert == 1){ 
                    this.statusAlert = 0;
                    this.statusIndex = 1;
                  console.log("------- flag statusAlert  in if ------", this.statusAlert);  

                    let date = new Date(new Date().getTime()+10000);
                    console.log(" -------------- time of second loop ---",date);
                    this.notification(date); 
                    console.log("------- first loop 111111 ------");
                  }else{
                    console.log("------- else flag ------")
                  }
                }           
          }else{
            this.statusIndex = 0; 
            console.log("------- else loop ------");
          }
      })
    console.log("........................................");
  }// end constructor
  setsensorValueDHT22(sen:any){
    console.log("Data to funtion: ",sen);
      for(let i = 0; i< sen.length;i++){
        console.log("in for of sensor DHT22 : ",i," ", sen[i].$key);
        if(sen[i].$key == "values"){
          this.sensorDHT22 = sen[i].$value;
        }else{
          console.log("Can't get data from sensore");
        }
        return this. sensorDHT22;
      }   
  }
  setsensorValueMQ2(sen:any){
    console.log("Data to funtion: ",sen);
      for(let i = 0; i< sen.length;i++){
        console.log("in for of sensor MQ2 : ",i," ", sen[i].$key);
        if(sen[i].$key == "values"){
          this.sensorMQ2 = sen[i].$value;
        }else{
          console.log("Can't get data from sensore");
        }
        return this.sensorMQ2; 
      }   
  }
  initialButtonState(btn:any){
    for(let i=0;i<btn.length;i++){
      if(btn[i].$key=="d1"){
        if(btn[i].$value){
          this.sButton1 = true;
          this.bgColor1 = "primary";
          this.icColor1 = "light"; 
        }else{
          this.sButton1 = false;    
          this.bgColor1 = "light"
          this.icColor1 = "dark";
        }
      }else if(btn[i].$key=="d2"){
          if(btn[i].$value){
            this.sButton2 = true;
            this.bgColor2 = "primary";
            this.icColor2 = "light"; 
          }else{
            this.sButton2 = false;    
            this.bgColor2 = "light"
            this.icColor2 = "dark";
          }
      }else if(btn[i].$key=="d3"){
          if(btn[i].$value){
            this.sButton3 = true;
            this.bgColor3 = "primary";
            this.icColor3 = "light"; 
          }else{
            this.sButton3 = false;    
            this.bgColor3 = "light"
            this.icColor3 = "dark";
          }
      } 
    }
  }
  buttonClickLED1(btn:boolean){
    let firebaseled = firebase.database().ref("home/led");
    if(btn){
      this.sButton1 = false;    
      this.bgColor1 = "primary";
      this.icColor1 = "light";
      firebaseled.child("d1").set(btn);
    }else{
      this.sButton1 = true;
      this.bgColor1 = "light"
      this.icColor1 = "dark";

      firebaseled.child("d1").set(btn);
    }

  }
  buttonClickLED2(btn:boolean){
    let firebaseled = firebase.database().ref("home/led");
    if(btn){
      this.sButton2 = false;    
      this.bgColor2 = "primary";
      this.icColor2 = "light";
      firebaseled.child("d2").set(btn);
    }else{
      this.sButton2 = true;
      this.bgColor2 = "light"
      this.icColor2 = "dark";

      firebaseled.child("d2").set(btn);
    }

  }
  buttonClickLED3(btn:boolean){
    let firebaseled = firebase.database().ref("home/led");
    if(btn){
      this.sButton3 = false;    
      this.bgColor3 = "primary";
      this.icColor3 = "light";
      firebaseled.child("d3").set(btn);
    }else{
      this.sButton3 = true;
      this.bgColor3 = "light"
      this.icColor3 = "dark";
      firebaseled.child("d3").set(btn);
    }
  }
  notification(date:any){
    console.log("------- To function notification !!!!! ------");
    this.platform.ready().then(()=>{
      this.localNotifications.schedule({
        //id:1,
        title:'อันตราย !!',
        text:'ตราจพบแก๊สหรือควัน',
        sound:this.setSound(),
        trigger:{at:date},
        led: 'FF0000',
        icon: 'http://example.com/icon.png',       
      })     
    })
    let alert = this.alertCrt.create({
      title:'คำเตือน',
      subTitle:'ควรตรวจสอบความเรียบร้อยที่บ้านของท่าน',
      buttons:[
        {
          text:'ตกลง',
          handler: ()=>{
            this.statusAlert = 1;
          }
        }
      ]       
    });
    alert.present();
  }
  notificationTem(date:any){
    console.log("------- To function notification !!!!! ------");
    this.platform.ready().then(()=>{
      this.localNotifications.schedule({
        //id:1,
        title:'อันตราย !!',
        text:'ตราจพบอุณหภูมิสูงเกินปิดปกติ',
        sound:this.setSound(),
        trigger:{at:date},
        led: 'FF0000',
        icon: 'http://example.com/icon.png',       
      })     
    })
    let alert = this.alertCrt.create({
      title:'คำเตือน',
      subTitle:'ควรตรวจสอบความเรียบร้อยที่บ้านของท่าน',
      buttons:[
        {
          text:'ตกลง',
          handler: ()=>{
            this.statusAlert = 1;
          }
        }
      ]       
    });
    alert.present();
  }
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/slowboard.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }
}