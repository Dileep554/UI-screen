import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';
  private photosSubject = new BehaviorSubject<any[]>([]);
  photos$ = this.photosSubject.asObservable();
  private cache: any[] = []; // Cache for storing fetched photos

  constructor(private http: HttpClient) { }

  fetchPhotos(): Observable<any[]> {
    if (this.cache.length > 0) {
      return of(this.cache); // Return cached data
    }
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(photos => {
        this.cache = photos; // Cache the result
        this.photosSubject.next(photos);
      }),
      catchError(error => {
        console.error('Error fetching photos:', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  getCounts(): Observable<any> {
    return this.photos$.pipe(
      map(photos => {
        const albumIdCount = new Set(photos.map(photo => photo.albumId)).size;
        const idCount = new Set(photos.map(photo => photo.id)).size;
        const titleCount = new Set(photos.map(photo => photo.title)).size;
        const urlCount = new Set(photos.map(photo => photo.url)).size;
        return { albumIdCount, idCount, titleCount, urlCount };
      })
    );
  }
}
