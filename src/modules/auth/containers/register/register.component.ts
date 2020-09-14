import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

declare let $: any;

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    errorList: string[] = [];
    modalMessage!: string;
    modalTitle!: string;
    isRegistrationInProcess: boolean = false;
    firstname: FormControl = new FormControl;
    lastname: FormControl = new FormControl;
    email: FormControl = new FormControl;
    password: FormControl = new FormControl;
    cpassword: FormControl = new FormControl;
    constructor(
        private fb: FormBuilder,
        private validatorService: AuthService,
        public toastrservice: ToastrService,
        private acct: UserService,
        private router: Router
    ) {}
    ngOnInit() {
        this.firstname = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
        this.lastname = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.password = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
        this.cpassword = new FormControl('', [Validators.required, this.validatorService.MustMatch(this.password)]);
        
        this.registerForm = this.fb.group({
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            cpassword: this.cpassword,
        });
    }

    onSubmit() {
        this.isRegistrationInProcess = true;
        let userDetails = this.registerForm.value;
        this.errorList = [];
        this.acct
            .register(
                userDetails.firstname,
                userDetails.lastname,
                userDetails.password,
                userDetails.email
            )
            .subscribe(
                (result) => {
                    if (result.message == 'Registration Successful') {
                        Swal.fire({
                            title: 'Registration was Successful!',
                    }).then((r) => {
                            
                            this.router.navigate(['/login']);
                        });
                        this.isRegistrationInProcess = false;
                    }
                },
                (error) => {
                    if (error.status == 500) {
                        this.toastrservice.info('An error occured while processing this request. Check details or Try again.', '', {
                            positionClass: 'toast-top-right'
                        });
                    }
                    if (error.error && error.error.value) {
                        this.errorList = [];
                        for (let i = 0; i < error.error.value.length; i++) {
                            this.errorList.push(error.error.value[i]);
                        }
                        this.showModalError();
                    }

                    this.isRegistrationInProcess = false;
                }
            );
    }

    showModalError() {
        this.modalTitle = 'Registration Error';
        this.modalMessage = 'Your Registration was Unsuccessful';
        $('#errorModal').modal('show');
    }
}
