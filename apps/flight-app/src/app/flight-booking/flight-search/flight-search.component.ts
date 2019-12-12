import {Component, OnInit} from '@angular/core';
import {FlightService} from '@flight-workspace/flight-api';
import { FlightBookingAppState, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { Store } from '@ngrx/store';
import { flightsLoaded, loadFlights, updateFlight } from '../+state/flight-booking.actions';
import { getAllFlights, getFilteredFlights } from '../+state/flight-booking.selectors';
import { first } from 'rxjs/operators';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  flights$ = this.store.select(getFilteredFlights)

  constructor(
    private store: Store<FlightBookingAppState>,
    private flightService: FlightService) {
  }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) return;

    // this.flightService
    //   .find(this.from, this.to, this.urgent)
    //   .subscribe(
    //     flights => {
    //       this.store.dispatch(flightsLoaded({flights}));
    //     },
    //     err => {
    //       console.error('err', err);
    //     }
    //   )

    this.store.dispatch(loadFlights({from: this.from, to: this.to, urgent: this.urgent}));

  }

  delay(): void {
    
    this.flights$.pipe(first()).subscribe(flights => {
        const flight = flights[0];

        // Mutation
        // flight.date = new Date().toISOString();

        const newFlight = { ...flight, date: new Date().toISOString()}

        this.store.dispatch(updateFlight({flight: newFlight}));

    })

  }

}
