import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map, Observable } from 'rxjs';
import { Art } from '../model/Art';

@Injectable({
  providedIn: 'root'
})
export class ArtService {
  ids: any = null;
  arts: any = null;
  owerId: any = null;
  mostRecentArt: any = null;
  
  constructor(private http: HttpClient) { 
  }

  getSavedArt() {
    let url = `${environment.API_URL}/arts`;
    return this.http.get(url).pipe(map((response: any) => {
      this.arts = response;
    }));
  }

  getArtIdsWithImages(): any {
    let url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=hasImages=true';
    return this.http.get(url).pipe(map((response: any) => {
      this.ids = response.objectIDs;
    }));
  }

  getOwnedArt(id: number) {
    let url = `${environment.API_URL}/arts/?ownerId=${id}`;
    return this.http.get(url).pipe(map((response: any) => {
      this.arts = response;
    }));
  }

  getArtsByType(type: string):Observable<void> {
    let search = 'search?isPublicDomain=true&hasImage=true&q=' + type;
    let url = 'https://collectionapi.metmuseum.org/public/collection/v1/';
    return this.http.get(url+search).pipe(map(response => {
      this.ids = response;
    }));
  }

  getArtById(objectID: number): Observable<Art>{
    let url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'+objectID;
    return this.http.get(url).pipe(map(response => response as Art))
  } 

  listArt(data: any){
    return this.http.post(
      `${environment.API_URL}/arts`, data, { 
        headers: {'Content-type': 'application/json'},
        observe: 'response'
      }).pipe(
          map(response => {
            return response.body as Art;
          })
      ) 
  }

  updateArtOwner(updatedArt: Art) {
    let id = updatedArt.id;
    return this.http.put(
      `${environment.API_URL}/arts/${id}`, updatedArt, { 
        headers: {'Content-type': 'application/json'},
        observe: 'response'
      }).pipe(
          map(response => {
            return response.body as Art;
          })
      ) 
  }

  deleteArt(id: number) {
    return this.http.delete(
      `${environment.API_URL}/arts/${id}`, { 
        headers: {'Content-type': 'application/json'},
        observe: 'response'
      }).pipe(
          map(response => {
            return response.body;
          })
      ) 
  }
}
