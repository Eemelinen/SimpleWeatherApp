import {environment} from '../../environments/environment';

export const  extraDataWindSpeed = (wind: number): ExtraData => {
  return {
    title: 'WS',
    imgUrl: `${environment.extra_data_icon_folder}wind.png`,
    value: `${wind} m/s`
  }
}
