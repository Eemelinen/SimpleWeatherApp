import { Component, OnInit } from '@angular/core';
import { AbstractNextWeekService } from '../../services/next-week/abstract-next-week.service';
import { Observable, of } from 'rxjs';
import { emptyNextWeekData } from '../../services/next-week/next-week.service';

@Component({
  selector: 'app-next-week',
  templateUrl: './next-week.component.html',
  styleUrls: ['./next-week.component.scss']
})
export class NextWeekComponent implements OnInit {
  nextWeekData$: Observable<WeatherNextWeekData> = of(emptyNextWeekData);

  constructor(private nextWeekService: AbstractNextWeekService) {
  }

  ngOnInit(): void {
    this.nextWeekData$ = this.nextWeekService.get();
  }

  getGraphData(dailyData: SmallWeatherCardData[]): number[] {
    return dailyData.map((data) => data.temperature);
  }
}
