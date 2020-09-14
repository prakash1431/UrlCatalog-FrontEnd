import { TestBed } from '@angular/core/testing';
import { MockUser, User } from '@testing/mocks';

import { UserService } from './user.service';

const mockUser = new MockUser();

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService],
        });
        userService = TestBed.inject(UserService);
    });
});
