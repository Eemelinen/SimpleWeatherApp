import { environment } from '../../environments/environment';

export const extraDataUV = (uvIndex: number): ExtraData => {
  return {
    title: 'UV',
    imgUrl: `${environment.extra_data_icon_folder}uv.png`,
    value: uvIndex <= 2 ? 'Low' : uvIndex <= 6 ? 'Moderate' : 'High'
  }
}
