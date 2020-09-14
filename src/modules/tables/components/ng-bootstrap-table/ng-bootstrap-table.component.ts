import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonuserService } from '@modules/tables/services';
import { CatalogUser } from 'app/global';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector: 'sb-ng-bootstrap-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './ng-bootstrap-table.component.html',
    styleUrls: ['ng-bootstrap-table.component.scss'],
})
export class NgBootstrapTableComponent implements OnInit {
    @Input() pageSize = 4;
    catalogusers$!: Observable<CatalogUser[]>;
    cataloguserlist!: CatalogUser[];
    constructor(public commonuserService: CommonuserService, private fb: FormBuilder) {}
    insertForm!: FormGroup;

    ngOnInit() {
        this.catalogusers$ = this.commonuserService.getUsers();
        this.catalogusers$.subscribe(result => {
            this.cataloguserlist = result;
        });
        // Initialize FormGroup using FormBuilder
        this.insertForm = this.fb.group({
            catlog: this.catalogusers$,
        });
    }

    onSubmit() {
        if (this.cataloguserlist.find(user => user.isAdmin == true)) {
            this.commonuserService.updateProfiles(this.cataloguserlist).subscribe(
                result => {
                    if (result.message == 'Profiles updated Successfully!') {
                        Swal.fire({
                            title: 'Profiles updated Successfully!',
                        });
                    }
                },
                error => {
                    Swal.fire({
                        title: 'Issue in updating the profiles',
                    });
                }
            );
        } else {
            Swal.fire({
                title: 'Atleast one user should be Admin always',
            });
        }
    }
}
