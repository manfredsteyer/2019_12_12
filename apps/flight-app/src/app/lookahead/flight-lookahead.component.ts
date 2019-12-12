import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, combineLatest, interval, of, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, switchMap, tap, startWith, map, distinctUntilChanged, filter, shareReplay, delay, mergeMap, concatMap, exhaustMap, catchError, takeUntil } from 'rxjs/operators';
import { Flight } from '@flight-workspace/flight-api';

@Component({
    selector: 'flight-lookahead',
    templateUrl: './flight-lookahead.component.html'
})
export class FlightLookaheadComponent implements OnInit, OnDestroy {

    sub = new Subject<void>();

    control: FormControl;
    flights$: Observable<Flight[]>;
    loading = false;

    online$: Observable<boolean>;

    constructor(private http: HttpClient) {
    }

    ngOnDestroy(): void {
        this.sub.next()
    }

   





    ngOnInit() {
        this.control = new FormControl();

        const input$ = this
                        .control
                        .valueChanges
                        .pipe(
                            debounceTime(300));

        this.online$ 
            = interval(2000).pipe(
                    startWith(0),
                    map(_ => true /* Math.random() < 0.5 */),
                    distinctUntilChanged(),
                    shareReplay(1)
            );

        this.flights$ = combineLatest(input$, this.online$).pipe(
            filter( ([_, online]) => online),
            map( ([value, online]) => value),
            switchMap(value => this.load(value)),
            takeUntil(this.sub)
        );



        // this.flights$ = this
        //                     .control
        //                     .valueChanges
        //                     .pipe(
        //                       debounceTime(300),
        //                       tap(v => this.loading = true),
        //                       switchMap(name => this.load(name)),
        //                       tap(v => this.loading = false)
        //                     );
    }

    load(from: string)  {
        let url = "http://www.angular.at/api/flight";

        let params = new HttpParams()
                            .set('from', from);

        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        return this
                .http
                .get<Flight[]>(url, {params, headers})
                .pipe(catchError(err => of([])));

        // .pipe(delay(7000));

    };


}
