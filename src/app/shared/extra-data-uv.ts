export const extraDataUV = (uvIndex: number, imgUrl: string): ExtraData => {
  return {
    title: 'UV',
    imgUrl: `${imgUrl}uv.png`,
    value: uvIndex <= 2 ? 'Low' : uvIndex <= 6 ? 'Moderate' : 'High'
  }
}
