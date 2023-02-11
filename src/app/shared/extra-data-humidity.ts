export const extraDataHumidity = (humidity: number, imgUrl: string): ExtraData => {
  return {
    title: 'RH',
    imgUrl: `${imgUrl}humidity.png`,
    value: `${humidity}%`
  }
}
