import { Component, Input, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import {
    Application,
    ChangeOwner,
    FeatureTeam,
    FilterOption,
    FilterType,
    Tribes,
} from 'app/global';
import { filter } from 'rxjs/operators';

const QUERY_PARAMS_SEPERATOR = ',';

export class Filters {
    public owner!: FilterOption[];
    public tribe!: FilterOption[];
    public featureTeam!: FilterOption[];
    public application!: FilterOption[];

    public visibleFilterOptions: FilterOption[] = [];
    public filtersDescription!: string;
    public defaultFilters!: FilterOption[];
    private allFilters: FilterOption[];

    constructor() {
        this.owner = Object.keys(ChangeOwner).map(x => this.mapFilterOption(FilterType.My, x));
        this.tribe = Object.keys(Tribes).map(x => this.mapFilterOption(FilterType.Tribes, x));
        this.featureTeam = Object.keys(FeatureTeam).map(x =>
            this.mapFilterOption(FilterType.FeatureTeam, x)
        );
        this.application = Object.keys(Application).map(x =>
            this.mapFilterOption(FilterType.Application, x)
        );

        this.allFilters = [];
        [this.owner, this.tribe, this.featureTeam, this.application].forEach(options => {
            options.forEach(filter => {
                this.allFilters[filter.upperkey] = filter;
            });
        });
    }

    public parseRouterParameters(propertyname: Params) {
        this.defaultFilters = [];
        Object.keys(propertyname).forEach(param => {
            propertyname[param].split(QUERY_PARAMS_SEPERATOR).forEach(originalKey => {
                const upper = originalKey.toUpperCase();
                const disableUpper = upper.slice(1, upper.length);
                if (upper.length > 0) {
                    const match = this.allFilters[upper] as FilterOption;
                    const disableMatch = this.allFilters[disableUpper] as FilterOption;
                    if (match) {
                        this.pushDefaultFilter(match, true);
                    } else if (disableMatch) {
                        this.pushDefaultFilter(disableMatch, false);
                    } else {
                        const customFilter = this.mapFilterOption(FilterType.Custom, originalKey);
                    }
                }
            });
        });
    }
    private mapFilterOption(type: FilterType, val: string): FilterOption {
        const result = new FilterOption();
        result.type = type;
        result.selected = false;
        result.key = val;
        result.upperkey = val.toUpperCase();
        return result;
    }

    private pushDefaultFilter(filterOption: FilterOption, isSelected: boolean) {
        const clone = JSON.parse(JSON.stringify(filterOption)) as FilterOption;
        clone.selected = isSelected;
        this.defaultFilters.push(clone);
    }

    public getAsQueryParams() {
        return this.visibleFilterOptions
            .map((param: FilterOption) => {
                return `${param.selected ? '' : '!'}${param.key}`;
            })
            .join(QUERY_PARAMS_SEPERATOR);
    }

    public computeDescription() {
        const tokens: string[] = [];
        for (let i = 0; i < this.visibleFilterOptions.length; ++i) {
            if (this.visibleFilterOptions[i].selected) {
                tokens.push(this.visibleFilterOptions[i].key);
            }
        }
        this.filtersDescription = tokens.join(' - ');
    }

    public resetDefaultFilters() {
        if (this.visibleFilterOptions) {
            for (let i = 0; i < this.visibleFilterOptions.length; ++i) {
                this.visibleFilterOptions[i].selected = false;
            }
        }
    }
    public addFilterFromKey(value: string) {
        const key = value.toUpperCase();
        const visibleMatch = this.visibleFilterOptions.find(f => f.upperkey === key);
        if (visibleMatch) {
            visibleMatch.selected = true;
        } else {
            const preDefinedMatch = this.allFilters[key] as FilterOption;
            if (preDefinedMatch) {
                this.visibleFilterOptions.push(preDefinedMatch);
                preDefinedMatch.selected = true;
            } else {
                const customFilter = this.mapFilterOption(FilterType.Custom, value);
                customFilter.selected = true;
                this.visibleFilterOptions.push(customFilter);
            }
        }
    }

    public remove(option: FilterOption): boolean {
        const index = this.visibleFilterOptions.indexOf(option);
        if (index > 0) {
            const removed = this.visibleFilterOptions.splice(index, 1);
            removed[0].selected = false;
        }
        return index >= 0;
    }

    public addFilter(filter: FilterOption) {
        const match = this.visibleFilterOptions.find(x => x.upperkey === filter.upperkey);
        if (!match) {
            this.visibleFilterOptions.push(filter);
        }
    }
}
