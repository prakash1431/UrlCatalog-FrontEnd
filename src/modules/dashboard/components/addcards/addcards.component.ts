import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Tribes } from 'app/global';
import { FeatureTeam } from 'app/global';
import { Application, BookMarkcard } from 'app/global';
import { stringify } from 'querystring';
import Swal from 'sweetalert2';

import { BookmarkService } from '../../services/bookmark.service';

@Component({
    selector: 'sb-addcards',
    templateUrl: './addcards.component.html',
    styleUrls: ['./addcards.component.scss'],
})
export class AddcardsComponent implements OnInit {
    keys = Object.keys;
    tribes = Tribes;
    teams = FeatureTeam;
    apps = Application;
    addCardForm: FormGroup;
    longurl: FormControl = new FormControl();
    title: FormControl = new FormControl();
    description: FormControl = new FormControl();
    expirydate: FormControl = new FormControl();
    tribe: string;
    team: string;
    application: string;
    bookmarkcard: BookMarkcard;
    errorList: string[] = [];
    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<AddcardsComponent>,
        private bmsv: BookmarkService
    ) {}
    ImageUrl: string;
    ngOnInit(): void {
        this.addCardForm = this.fb.group({
            longurl: this.longurl,
            title: this.title,
            description: this.description,
            expirydate: this.expirydate,
        });
    }

    save() {
        const card = this.addCardForm.value;
        this.errorList = [];
        this.bmsv
            .addbookmark(card, this.team, this.tribe, this.application, this.ImageUrl)
            .subscribe(
                result => {
                    if (result.message == 'Card Successfully Created!') {
                        Swal.fire({
                            title: 'Card Successfully Created!',
                        }).then(r => {
                            this.cancel();
                        });
                    }
                },
                error => {
                    Swal.fire({
                        title: 'Failed to save the card',
                    });
                }
            );
    }

    cancel() {
        this.dialogRef.close();
    }
    onFileComplete(data: any) {
        if (data.success) {
            this.ImageUrl = data.link;
        }
        console.log(data);
    }
}
