import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '@flight-workspace/flight-api';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  [flightBookingFeatureKey]: FlightBookingState;
}

export interface FlightBookingState {
  flights: Flight[];
  stats: object;
  blackList: number[];
}

export const initialState: FlightBookingState = {
  flights: [],
  stats: {},
  blackList: [5]
};

const flightBookingReducer = createReducer(
  initialState,

  on(FlightBookingActions.flightsLoaded, (state, action) => {
    const flights = action.flights;
    
    // Mutable == Verboten!
    // state.flights = flights;

    return { ...state, flights };
  }),

  on(FlightBookingActions.updateFlight, (state, action) => {
    const newFlight = action.flight;
    const oldFlights = state.flights;

    const flights = oldFlights.map(f => f.id === newFlight.id ? newFlight : f );

    // Mutable == Verboten!
    // state.flights = flights;

    return { ...state, flights };
  }),

);

export function reducer(state: FlightBookingState | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
