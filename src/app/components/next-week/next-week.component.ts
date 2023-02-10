import { Component, OnInit } from '@angular/core';
import { AbstractNextWeekService } from '../../services/next-week/abstract-next-week.service';
import { Observable, of } from 'rxjs';
import { emptyNextWeekData } from '../../services/next-week/next-week.service';
import { AverageHumidityService } from '../../services/weather-data-average/average-humidity.service';

@Component({
  selector: 'app-next-week',
  templateUrl: './next-week.component.html',
  styleUrls: ['./next-week.component.scss'],
  providers: [AverageHumidityService],
})
export class NextWeekComponent implements OnInit {
  nextWeekData$: Observable<WeatherNextWeekData> = of(emptyNextWeekData);
  averageHumidity$: Observable<number> = of(-1);

  constructor(
    private nextWeekService: AbstractNextWeekService,
    // Todo: Change to abstract service
    private averageHumidityService: AverageHumidityService,
    ) {
  }

  ngOnInit(): void {
    this.nextWeekData$ = this.nextWeekService.get();
    this.averageHumidity$ = this.averageHumidityService.get();
  }

  getGraphData(dailyData: SmallWeatherCardData[]): number[] {
    return dailyData.map((data) => data.temperature);
  }
}
