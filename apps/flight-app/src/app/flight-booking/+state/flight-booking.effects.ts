import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, switchMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';


import { FlightService } from '@flight-workspace/flight-api';
import { loadFlights, flightsLoaded } from './flight-booking.actions';


@Injectable()
export class FlightBookingEffects {

  loadFlightBookings$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(loadFlights),
      switchMap(a => this.flightService.find(a.from, a.to, a.urgent)),
      map(flights => flightsLoaded({flights}))
    );
  });

  constructor(private actions$: Actions, private flightService: FlightService) {}

}
