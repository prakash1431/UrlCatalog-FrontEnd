import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableStore } from '@codewithdan/observable-store'; //for state management
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { StoreState } from '../models';
import { Login } from '../models';
import { RegisterViewModel } from '../models/auth.model';

@Injectable({
    providedIn: 'root',
})
export class UserService extends ObservableStore<StoreState> {
    private baseUrlRegister = 'https://localhost:44367/api/v1/account/register';
    private baseUrlAuth = 'https://localhost:44367/api/v1/account/auth';
    private baseUrlLogout = '/api/v1/account/logout';

    private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
    private UserName = new BehaviorSubject<string>(this.cookieService.get('username'));
    private UserRole = new BehaviorSubject<string>(this.cookieService.get('userRole'));

    registerModel!: RegisterViewModel;
    loginModel!: Login;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router
    ) {
        super({ logStateChanges: true, trackStateHistory: true });

        this.loginStatus.subscribe(result => {
            this.setState({ loggedInStatus: result }, 'LOGGED_IN_STATUS');
        });
    }

    login(email: string, password: string) {
        // Check if there is an active two factor session
        const isSessionActive = localStorage.getItem('isSessionActive');

        if (isSessionActive == '0' || isSessionActive == undefined || !(isSessionActive == '1')) {
            const grantType = 'password';
            // Create a Login Model Object to send to API
            this.loginModel = {
                email,
                password,
                grant_type: 'password',
            };

            return this.http
                .post<any>(
                    this.baseUrlAuth,
                    { email, password, grantType },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'No-Auth': 'True',
                            'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN'),
                        },
                    }
                )
                .pipe(
                    map(result => {
                        // First we need to update some values in localstorage before we return the result to client
                        // Here we are checking if the user received an result and the result contains a auth token
                        if (result && result.token) {
                            this.loginStatus.next(true);
                            this.UserName.next(this.cookieService.get('username'));
                            this.UserRole.next(this.cookieService.get('userRole'));
                        }
                        return result;
                    })
                );
        } else {
            Swal.fire({
                title: 'Session Active',
                text: 'Previous Session is already active. Do you want to end previous session ?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'End Session',
            }).then(result => {
                if (result.value) {
                    window.location.reload();
                }
            });

            return new Observable();
        }
    }

    register(firstname: string, lastname: string, password: string, email: string) {
        // Create a Register Model Object to send to API
        this.registerModel = {
            Firstname: firstname,
            Lastname: lastname,
            Password: password,
            Email: email,
        };

        return this.http
            .post<any>(this.baseUrlRegister, this.registerModel, {
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

    logout() {
        this.clearCookies();
        this.clearCache();
        this.setState({ loggedInStatus: false }, 'LOGGED_IN_STATUS');
        return this.http.get<any>(this.baseUrlLogout, {
            headers: { 'Content-Type': 'application/json', 'No-Auth': 'True' },
        });
    }

    checkLoginStatus(): boolean {
        const loginCookie = this.cookieService.get('loginStatus');

        return loginCookie == '1';
    }

    clearCache() {}

    clearCookies() {
        localStorage.removeItem('twoFactorToken');
        localStorage.removeItem('codeExpiry');
        localStorage.removeItem('isSessionActive');
        localStorage.removeItem('attemptsRemaining');
        localStorage.removeItem('codeSendSuccess');
        localStorage.removeItem('user_id');
    }

    get currentUserName() {
        return this.UserName.asObservable();
    }
}
