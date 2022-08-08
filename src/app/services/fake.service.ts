import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FakeService {
  getDataV1(): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    return this.http.get(url);
  }
  getDataV2(): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    return this.http
      .get(url)
      .pipe(
        tap(console.log),
        catchError(this._handleError('Failed fetch error'))
      );
  }

  private _handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);

      const message = `Serverr retuned code ${error.status} with bode ${error.error}`;
      throw new Error(`${operation} failed: ${message}`);
    };
  }
  constructor(private http: HttpClient) {}
}
