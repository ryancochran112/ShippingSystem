import {Component} from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
    <div><h1>{{pageTitle}}</h1>
      <pm-orders></pm-orders>
    </div>
  `
})

export class AppComponent{
  pageTitle: string = 'Ryan\'s Shipping System';
}
