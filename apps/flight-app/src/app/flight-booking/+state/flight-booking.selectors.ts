import { flightBookingFeatureKey, FlightBookingState, FlightBookingAppState } from './flight-booking.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import * as fromFlightBooking from './flight-booking.reducer';

// export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.FlightBookingState>(
//   fromFlightBooking.flightBookingFeatureKey
// );


export const getAllFlights = s => s[flightBookingFeatureKey].flights;

export const getAllFlights2 = createSelector(s =>
                                s[flightBookingFeatureKey].flights,
                                flights => flights);

export const getFilteredFlights = createSelector(
    (s: FlightBookingAppState) => s[flightBookingFeatureKey].flights,
    (s: FlightBookingAppState) => s[flightBookingFeatureKey].blackList,
    (flights, blackList) => flights.filter(f => !blackList.includes(f.id))
);

export const flightBookingSelector = createFeatureSelector<FlightBookingState>(flightBookingFeatureKey);

export const getAllFlights3 = createSelector(
  flightBookingSelector,
  (fb) => fb.flights);
