import { CountryService } from './country.service';
import { TablesService } from './tables.service';
import { CommonuserService } from './commonuser.service';

export const services = [TablesService, CountryService,CommonuserService];

export * from './tables.service';
export * from './country.service';
export * from './commonuser.service';