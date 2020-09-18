import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Application, BookMarkcard, FeatureTeam, Tribes } from 'app/global';
import { letProto } from 'rxjs-compat/operator/let';
import Swal from 'sweetalert2';

import { BookmarkService } from '../../services/bookmark.service';
declare let $: any;
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
    icon: FormControl = new FormControl();
    application: string;
    bookmarkcard: BookMarkcard;
    errorList: string[] = [];
    updateProfileForm: FormGroup;
    profpicfile: FormControl = new FormControl();
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
                    if (result.message === 'Card Successfully Created!') {
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

    triggerInput() {
        $('#profpicfile').trigger('click');
    }

    onFileChanged(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            const file = event.target.files[0];
            this.addCardForm.get('profpicfile').setValue(file);
            reader.readAsDataURL(file);
            reader.onload = () => {
                $('#profpic')
                    .find('img')
                    .attr('src', reader.result as string);
            };
        }
    }
}
