import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  endpointForm: FormGroup;

  title = environment.appName;
  capiEndpoint: string = environment.capiEndpoint;

  endpoint: string = "";

  constructor() {
    this.endpointForm = new FormGroup({
      endpoint: new FormControl()
    });
    if(localStorage.getItem("capiEndpoint") === null) {
      localStorage.setItem('capiEndpoint', this.capiEndpoint);
    } else {
      this.capiEndpoint = localStorage.getItem("capiEndpoint")!;
    }
  }

  submit() {
    localStorage.setItem('capiEndpoint', this.endpointForm.get('endpoint')?.value);
    this.capiEndpoint = this.endpointForm.get('endpoint')?.value;
    console.log(this.endpointForm.get('endpoint')?.value);
  }
}
