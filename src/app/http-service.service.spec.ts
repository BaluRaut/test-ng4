import { TestBed, getTestBed  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Constants } from './constants';
import { HttpService} from './http-service.service';

describe('HttpServiceService', () => {
    let injector: TestBed;
    let service: HttpService;
    let httpMock: HttpTestingController;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [HttpService]
      });
      injector = getTestBed();
      service = injector.get(HttpService);
      httpMock = injector.get(HttpTestingController);
    });
    
    afterEach(() => {
      httpMock.verify();
    });
    describe('getUsers List', () => {
      it('should return an Observable<User[]>', () => {
        const dummyUsers = [
          { name: 'TeraData User 1' },
          { name: 'TeraData User 2' }
        ];    
        service.get('https://jsonplaceholder.typicode.com/users').subscribe(users => {
          expect(users.length).toBe(2);
          expect(users).toEqual(dummyUsers);
        });    
        const req = httpMock.expectOne(`${Constants.USER_LIST_URL}`);
        expect(req.request.method).toBe("GET");
        req.flush(dummyUsers);
      });
    });
  });

