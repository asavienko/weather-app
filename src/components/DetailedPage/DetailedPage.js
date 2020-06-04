import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import {
  getCityWeatherByName,
  getDailyForecast,
} from '../../servises/weatherServices';

const DetailedPage = () => {
  const { cityName } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [cityInfo, setCityInfo] = useState(null);

  useEffect(() => {
    setIsLoading(!isLoading);
    getCityWeatherByName(cityName)
      .then(({ coord: { lat, lon }, ...resData }) => {
        setCityInfo(resData);
        return getDailyForecast(lat, lon);
      })
      .then((dailyForecast) => console.log(dailyForecast))
      .finally(() => setIsLoading(false));
  }, [cityName]);
  if (cityInfo) {
    console.log(cityInfo);
  }
  return (
    <Spin spinning={isLoading} tip="Loading...">
      <span>{cityName}</span>
    </Spin>
  );
};

export default DetailedPage;
