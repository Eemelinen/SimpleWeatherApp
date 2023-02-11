export const  extraDataWindSpeed = (wind: number, imgUrl: string): ExtraData => {
  return {
    title: 'WS',
    imgUrl: `${imgUrl}wind.png`,
    value: `${wind} m/s`
  }
}
