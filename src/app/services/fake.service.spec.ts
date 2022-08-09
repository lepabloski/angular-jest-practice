// import { TestBed } from '@angular/core/testing';

import { NotExpr } from '@angular/compiler';
import { of, throwError } from 'rxjs';
import { FakeService } from './fake.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('FakeService', () => {
  let service: FakeService;
  let HttpClientSpy: any;

  beforeEach(() => {
    HttpClientSpy = {
      // this is the way to mock methods in this fake http service
      get: jest.fn(),
      post: jest.fn(),
    };
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(FakeService);
    service = new FakeService(HttpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // he test for service
  it('should test service method getDataV1', () => {
    // mock f the response
    const res = 'pablitotester';
    // former url
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    // mock of a a http get request  that returns an observable
    jest.spyOn(HttpClientSpy, 'get').mockReturnValue(of(res));
    // we trigger the method from the service
    service.getDataV1();
    // we test that this method is colled 1 time
    expect(HttpClientSpy.get).toBeCalledTimes(1);
    // and that the url is passed as a parameter
    expect(HttpClientSpy.get).toHaveBeenCalledWith(url);
  });

  // test of the second version of the code,we use done to a void return, just like a wait / async function

  // successs scenario
  it('should test service method getDataV2 success', (done) => {
    // if the response takes too long, we can use jest.setTimeout(30000); to extend de 5000 milliseconds default timeout value.
    // mock f the response
    const res = 'pablitotester';
    // former url
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    // mock of a a http get request  that returns an observable
    jest.spyOn(HttpClientSpy, 'get').mockReturnValue(of(res));
    // we trigger the method from the service
    service.getDataV2().subscribe({
      // as we recive an observable response, we use 2 of the 3 methods availables, next and error using the new observable notation.

      next: (data) => {
        expect(data).toEqual(res);
        done();
      },
      error: (err) => console.log(err),
    });
    // we test that this method is colled 1 time
    expect(HttpClientSpy.get).toBeCalledTimes(1);
    // and that the url is passed as a parameter
    expect(HttpClientSpy.get).toHaveBeenCalledWith(url);
  });

  // error scenario
  it('should test service method getDataV2 error scenario', (done) => {
    // if the response takes too long, we can use jest.setTimeout(30000); to extend de 5000 milliseconds default timeout value.
    // mock f the response
    const errorResponse = new HttpErrorResponse({
      error: 'Test 404 error',
      status: 404,
      statusText: 'Not found',
    });
    // former url
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    // mock of a a http get request  that returns an observable
    jest
      .spyOn(HttpClientSpy, 'get')
      .mockReturnValue(throwError(() => errorResponse));
    // we trigger the method from the service
    service.getDataV2().subscribe({
      // as we recive an observable response, we use 2 of the 3 methods availables, next and error using the new observable notation.

      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        expect(err.message).toContain('Test 404 error'), done();
      },
    });
    // we test that this method is colled 1 time
    expect(HttpClientSpy.get).toBeCalledTimes(1);
    // and that the url is passed as a parameter
    expect(HttpClientSpy.get).toHaveBeenCalledWith(url);
  });

  // post request testing
  it('Testing postDataV1', () => {
    // data
    const command = 'testing';
    // response
    const res = 'Sometesting';
    // url endpoint
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    jest.spyOn(HttpClientSpy, 'post').mockReturnValue(of(res));
    service.postDataV1(command);
    expect(HttpClientSpy.post).toBeCalledTimes(1);
  });
});
