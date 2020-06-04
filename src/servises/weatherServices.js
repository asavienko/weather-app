import { getRequest } from './fetchUtils';

// eslint-disable-next-line import/prefer-default-export
export const getCityWeatherByName = (cityName) => getRequest(
  `data/2.5/weather?q=${cityName}&units=metric&appid=c0cf2c5a25621d8154d01808a9b58272`,
);

export const getCityWeatherById = (id) => getRequest(
  `data/2.5/weather?id=${id}&units=metric&appid=c0cf2c5a25621d8154d01808a9b58272`,
);

export const getDailyForecast = (lat, lon) => getRequest(
  `data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=c0cf2c5a25621d8154d01808a9b58272`,
);
