import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition' 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  text: string;
  sentences: Array<String> = [];
  error: string;
  constructor(private speech: SpeechRecognition, private tts: TextToSpeech, public navCtrl: NavController) {

  }

  async speakIt():Promise<any>
  {
    try {
      await this.tts.speak({text: this.text, locale: 'en-GB'});
      console.log(this.text);
    } catch (error) {
      this.error = error;
    }
  }

  listen():void {
      this.speech.startListening().subscribe(data => this.sentences = data, error => console.log(error));
  }

  async hasPermission():Promise<boolean> {
    try {
      const permission = await this.speech.hasPermission();
      return permission;  
    } catch (error) {
      console.log(error);
    }
    
  }

  async getPermission():Promise<void> {
    try {
      const permission = await this.speech.requestPermission();  
      console.log(permission);
    } catch (error) {
      console.log(error);
    }
  }

  async isSpeechSupported():Promise<boolean> {
    const isAvailable = await this.speech.isRecognitionAvailable();
    console.log(isAvailable);
    return isAvailable;
  }

  async getSupportedLanguages():Promise<Array<String>> {
    try {
      const languages = await this.speech.getSupportedLanguages();
      console.log(languages);
      return languages;
    } catch (error) {
      console.log(error);
    }
  }

}
