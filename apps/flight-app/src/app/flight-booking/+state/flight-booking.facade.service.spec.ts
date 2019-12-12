/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FlightBooking.facadeService } from './flight-booking.facade.service';

describe('Service: FlightBooking.facade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightBooking.facadeService]
    });
  });

  it('should ...', inject([FlightBooking.facadeService], (service: FlightBooking.facadeService) => {
    expect(service).toBeTruthy();
  }));
});
