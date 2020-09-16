import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BookMarkcard, ChangeOwner, FilterOption, FilterType, Global } from '@app/global';
import Swal from 'sweetalert2';

import { FiltercardsComponent } from '../../components/filtercards/filtercards.component';
import { BookmarkService } from '../../services/bookmark.service';

interface SelectedChange {
    element: HTMLElement;
    change: BookMarkcard;
}
const SELECTED_CARD_SELECTOR = 'selected';
@Component({
    selector: 'sb-urlcatalog',
    templateUrl: './urlcatalog.component.html',
    styleUrls: ['./urlcatalog.component.scss'],
})
export class UrlcatalogComponent implements OnInit {
    @ViewChild('filters')
    private filterComponent: FiltercardsComponent;
    private currentFilterOptions: FilterOption[];
    public visibleDecoratorsCount = 0;
    public decorators: ChangeDecorator[] = [];
    public selectedCard: SelectedChange;
    constructor(private bmsvc: BookmarkService, private sanitizer: DomSanitizer) {}

    async ngOnInit() {
        this.bmsvc.getbookmarkCards().subscribe(
            changes =>
                (this.decorators = changes.map<ChangeDecorator>(
                    c => new ChangeDecorator(c, this.sanitizer, false)
                )),
            err => {
                Swal.fire({
                    title: 'Bookmarks cannot be loaded',
                });
            },
            () => {
                this.filterComponent.filtersChanged();
            }
        );
    }

    public showAction(action: string): boolean {
        switch (action.toLowerCase()) {
            case 'accept':
                return Global.userrole.toLowerCase() === 'administrator';
            default:
                return true;
        }
    }
    public applyFilters(event: FilterOption[]) {
        this.currentFilterOptions = event;
        this.visibleDecoratorsCount = 0;
        if (this.decorators === undefined || event === undefined) {
            return;
        }
        this.decorators.forEach(decorator => {
            decorator.isVisible = this.filterChange(decorator.change, event);
            if (decorator.isVisible) {
                this.visibleDecoratorsCount++;
            }
        });
    }
    private filterChange(change: BookMarkcard, filterOptions: FilterOption[]): boolean {
        const result: { [id: string]: boolean } = {};
        Object.keys(FilterType).forEach(x => (result[x] = null));
        for (let i = 0; i < filterOptions.length; i++) {
            if (!filterOptions[i].selected) {
                continue;
            }
            const filterValue = filterOptions[i].key.toLowerCase();
            switch (filterOptions[i].type) {
                case FilterType.My:
                    result[FilterType.My] =
                        result[FilterType.My] || change.owner === Global.username;
                    break;
                case FilterType.Application:
                    result[FilterType.Application] =
                        result[FilterType.Application] ||
                        change.Application.toLowerCase() === filterValue;
                    break;
                case FilterType.FeatureTeam:
                    result[FilterType.FeatureTeam] =
                        result[FilterType.FeatureTeam] ||
                        change.FeatureTeam.toLowerCase() === filterValue;
                    break;
                case FilterType.Tribes:
                    result[FilterType.Tribes] =
                        result[FilterType.Tribes] || change.Tribe.toLowerCase() === filterValue;
                    break;
                case FilterType.Custom:
                    result[FilterType.Custom] =
                        result[FilterType.Custom] ||
                        change.UserName.toLowerCase().indexOf(filterValue) > -1;
                    break;
            }
        }
        return (
            (result[FilterType.My] == null || result[FilterType.My]) &&
            (result[FilterType.Application] == null || result[FilterType.Application]) &&
            (result[FilterType.Custom] == null || result[FilterType.Custom]) &&
            (result[FilterType.FeatureTeam] == null || result[FilterType.FeatureTeam]) &&
            (result[FilterType.Tribes] == null || result[FilterType.Tribes])
        );
    }

    public selectCard(event: MouseEvent, decorator: ChangeDecorator) {
        const triggeredElement = event.currentTarget as HTMLElement;
        const change = decorator.change;
        if (this.selectedCard) {
            this.selectedCard.element.classList.remove(SELECTED_CARD_SELECTOR);
            if (this.selectedCard.change === change) {
                this.selectedCard = null;
                return;
            }
        }
        this.selectedCard = {
            element: triggeredElement,
            change,
        };
        triggeredElement.classList.add(SELECTED_CARD_SELECTOR);
    }
    public stopPropogation(event: MouseEvent) {
        event.stopPropagation();
    }
}

export class ChangeDecorator {
    change: BookMarkcard;
    projectImage: SafeHtml;
    isVisible: boolean;

    constructor(change: BookMarkcard, sanitizer: DomSanitizer, isVisible: boolean) {
        this.change = change;
        this.projectImage = sanitizer.bypassSecurityTrustHtml(change.IconName);
        this.isVisible = isVisible;
    }
}
