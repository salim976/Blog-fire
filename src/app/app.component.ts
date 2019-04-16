import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
constructor() {
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyAOQL-D_ZQfWKQLlmk-N47uvXhscMzSEPE",
    authDomain: "blog-ce441.firebaseapp.com",
    databaseURL: "https://blog-ce441.firebaseio.com",
    projectId: "blog-ce441",
    storageBucket: "blog-ce441.appspot.com",
    messagingSenderId: "802346575810"
  };
  firebase.initializeApp(config);
}

}
