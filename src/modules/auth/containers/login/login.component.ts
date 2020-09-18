import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Global} from 'app/global';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs'; //get latest value and we can intialize intial value
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    insertForm!: FormGroup;
    Email!: FormControl;
    Password!: FormControl;
    ErrorMessage!: string;
    invalidLogin!: boolean;

    LoginStatus$ = new BehaviorSubject<boolean>(false);
    constructor(
        private auth: AuthService,
        private usersvc: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        public toasterService: ToastrService
    ) {}
    ngOnInit() {
        this.usersvc.globalStateChanged.subscribe(state => {
            this.LoginStatus$.next(state.loggedInStatus);
        });

        if (this.LoginStatus$.getValue()) {
            this.router.navigate(['/']);
        }

        // Initialize Form Controls
        this.Email = new FormControl('', [Validators.required]);
        this.Password = new FormControl('', [Validators.required]);

        // Initialize FormGroup using FormBuilder
        this.insertForm = this.fb.group({
            Email: this.Email,
            Password: this.Password,
        });
    }

    onSubmit() {
        const userlogin = this.insertForm.value;
        this.usersvc.login(userlogin.Email, userlogin.Password).subscribe(
            result => {
                this.invalidLogin = false;
                Global.userrole = result.role;
                Global.username = result.username;
                this.router.navigate(['/dashboard']);
            },
            error => {
                this.invalidLogin = true;
                this.ErrorMessage = error;
                if (error.status == 500) {
                    this.toasterService.info(
                        'Our Team is working to fix this error. Try again later.',
                        '',
                        { positionClass: 'toast-top-right' }
                    );
                }
                if (error.status == 401) {
                    if (error.error.loginError) {
                        if (error.error.loginError == 'Auth Code Required') {
                            localStorage.setItem('codeExpiry', error.error.expiry);
                            localStorage.setItem('twoFactorToken', error.error.twoFactorToken);
                            localStorage.setItem('isSessionActive', '1');
                            localStorage.setItem('user_id', error.error.userId);
                            this.router.navigate(['/send-code']);
                            return false;
                        }
                    } else {
                        this.toasterService.error(
                            'Invalid Username/Password. Please check credentials and try again',
                            '',
                            {
                                positionClass: 'toast-top-right',
                                timeOut: 3000,
                            }
                        );
                        return false;
                    }
                } else {
                    this.toasterService.warning(
                        'An error occured while processing this request.',
                        '',
                        { positionClass: 'toast-top-right' }
                    );
                    return false;
                }
                Swal.fire({
                    title: 'Login Failed, User Name or Password is invalid',
                });
            }
        );
    }
}
