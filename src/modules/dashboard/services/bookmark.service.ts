import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BookMarkcard, Global } from '@app/global';
import { ObservableStore } from '@codewithdan/observable-store'; // for state management
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { StoreState } from '../../auth/models';

@Injectable({
    providedIn: 'root',
})
export class BookmarkService extends ObservableStore<StoreState> {
    private baseUrlCreateBookMark = 'https://localhost:44367/api/v1/bookmark/addbookmark';
    private baseUrlgetBookMarks = 'https://localhost:44367/api/v1/bookmark/GetAllcards';
    private baseUrlApproveBookMark = 'https://localhost:44367/api/v1/bookmark/Approve';
    bookMarkcard = {} as BookMarkcard;
    public bookmarkcards$: Observable<BookMarkcard[]>;
    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router
    ) {
        super({ logStateChanges: true, trackStateHistory: true });
    }

    addbookmark(
        card: BookMarkcard,
        team: string,
        tribe: string,
        application: string,
        imageUrl: string
    ) {
        card.FeatureTeam = team;
        card.Tribe = tribe;
        card.Application = application;
        card.IconName = imageUrl;
        card.UserName = Global.username;

        return this.http
            .post<any>(this.baseUrlCreateBookMark, card, {
                headers: {
                    'Content-Type': 'application/json',
                    'No-Auth': 'True',
                    'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN'),
                },
            })
            .pipe(
                map(
                    result => {
                        return result;
                    },
                    (error: any) => {
                        return error;
                    }
                )
            );
    }

    getbookmarkCards() {
        this.bookmarkcards$ = this.http.get<any>(this.baseUrlgetBookMarks).pipe(
            shareReplay(), // used to cache values
            map(result => {
                return result;
            })
        );
        return this.bookmarkcards$;
    }

    approveBookmarkCard(card: BookMarkcard) {
        return this.http
            .post<any>(this.baseUrlApproveBookMark, card, {
                headers: {
                    'Content-Type': 'application/json',
                    'No-Auth': 'True',
                    'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN'),
                },
            })
            .pipe(
                map(
                    result => {
                        return result;
                    },
                    (error: any) => {
                        return error;
                    }
                )
            );
    }
}
