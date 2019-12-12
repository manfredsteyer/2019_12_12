import {Component} from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private oauthService: OAuthService) { 


    oauthService.configure(authConfig);
    oauthService.loadDiscoveryDocumentAndTryLogin();


    const s = new ReplaySubject<number>(3);
    s.next(12);
    s.next(13);
    s.next(14);
    s.next(15);

    s.subscribe(x => console.debug(x));

  }
}

