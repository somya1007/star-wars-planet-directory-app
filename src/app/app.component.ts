import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlanetsService } from './common/services/planets.service';
import { Planet } from './common/domain/planetApiResponse';
import { Subscription, concat, finalize, switchMap, zipAll } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  planetsData: Planet[] = [];
  currentPage: number = 1;
  isLoading: boolean = true;
  itemsPerPage: number = 10;
  totalItems!: number
  planetDataSubscription!: Subscription;
  residentDataSubscription!: Subscription;

  constructor(private planetsService: PlanetsService) { }

  ngOnInit(): void {
    this.fetchData();
  }


  fetchData(): void {
    this.isLoading = true;
    this.planetsData = [];
    this.planetDataSubscription = this.planetsService.getPlanetList(this.currentPage).pipe(
      switchMap((response) => {
        this.totalItems = response.count;
        const requests = response.results.map((result, index) => {
          this.planetsData[index] = result;
          this.planetsData[index].residentObj = [];
          this.planetsData[index].residents.forEach(value => {
            this.residentDataSubscription = this.planetsService.getResidentList(value).subscribe(data => {
              this.planetsData[index].residentObj.push(data);
            })
          })
        }
        );
        return concat(requests).pipe(
          finalize(() => {
            this.isLoading = false;
          })
        );
      })
    )
      .subscribe();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.residentDataSubscription.unsubscribe();
    this.planetDataSubscription.unsubscribe();
  }

}
