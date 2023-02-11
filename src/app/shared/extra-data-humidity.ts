import { environment } from '../../environments/environment';

export const extraDataHumidity = (humidity: number): ExtraData => {
  return {
    title: 'RH',
    imgUrl: `${environment.extra_data_icon_folder}humidity.png`,
    value: `${humidity}%`
  }
}
