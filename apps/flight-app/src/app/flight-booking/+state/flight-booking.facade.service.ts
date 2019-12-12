import { Injectable } from '@angular/core';
import { FlightService, Flight } from '@flight-workspace/flight-api';
import { BehaviorSubject } from 'rxjs';
import { FlightBookingAppState, flightBookingFeatureKey } from './flight-booking.reducer';
import { Store } from '@ngrx/store';
import { flightsLoaded } from './flight-booking.actions';

@Injectable({
  providedIn: 'root'
})
export class FlightBookingFacade {

  constructor(
    private flightService: FlightService,
    private store: Store<FlightBookingAppState>
    ) { }

  // private flightsSubject = new BehaviorSubject<Flight[]>([]);
  // flights$ = this.flightsSubject.asObservable();

  flights$ = this.store.select(s => s[flightBookingFeatureKey].flights);

  search(from: string, to: string, urgent: boolean) {
    this.flightService.find(from, to, urgent).subscribe(
      flights => {
        this.store.dispatch(flightsLoaded({flights}));
      },
      err => {
        console.error('err', err);
      }
    )
  }

}
