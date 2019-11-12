import { Component, OnInit } from '@angular/core';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
import { from, interval, Observable } from 'rxjs';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  motivationWord = "يلا"
  motivationColor = "red"

  constructor(private sensors: Sensors, private nativeAudio: NativeAudio) { }

  ngOnInit() {
    //load sound
    this.nativeAudio.preloadSimple('3ash', 'assets/sounds/1.mp3')
    //load proximity sensor
    this.sensors.enableSensor(TYPE_SENSOR.PROXIMITY)
    //listen to sensor promise as observable
    let sensorObservable$ = new Observable(observer => {
      setInterval(() => {
        this.sensors.getState().then(res => {
          observer.next(res)
        })
      }, 200)
    })
    sensorObservable$.subscribe(res => {
      //object is near when value = 0
      if (res[0] === 0) {
        console.log('you are close');
        this.nativeAudio.play('3ash');
        this.motivationWord = "عااااش"
        this.motivationColor = "green"

      }
    })



  }

}
