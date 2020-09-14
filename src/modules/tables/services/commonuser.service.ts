import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableStore } from '@codewithdan/observable-store'; // for state management
import { CatalogUser } from 'app/global';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CommonuserService {
    private baseUrlUsers = 'https://localhost:44367/api/v1/profile/GetAllUsers';
    private baseUrlUpdateUserRoles = 'https://localhost:44367/api/v1/profile/UpdateProfile';
    public catalogusers$!: Observable<CatalogUser[]>;
    constructor(
        private http: HttpClient,
        private router: Router,
        private cookieService: CookieService
    ) {}

    getUsers() {
        this.catalogusers$ = this.http.get<any>(this.baseUrlUsers).pipe(
            shareReplay(), // used to cache values
            map(result => {
                return result;
            })
        );
        return this.catalogusers$;
    }

    updateProfiles(users: CatalogUser[]) {
        return this.http
            .post<any>(this.baseUrlUpdateUserRoles, users, {
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
