import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanetApiResponse, Resident } from '../domain/planetApiResponse';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  getPlanetListUrl: string = "https://swapi.dev/api/planets/?page={pageNo}&format=json"

  constructor(private http: HttpClient) { }

  getPlanetList(page: number = 1): Observable<PlanetApiResponse> {
    const url = this.getPlanetListUrl.replace("{pageNo}", page.toString());
    return this.http.get<PlanetApiResponse>(url);
  }

  getResidentList(url: string): Observable<Resident> {
    return this.http.get<Resident>(url);
  }
}
