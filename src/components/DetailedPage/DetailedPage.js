import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Typography } from 'antd';
import {
  Line, LineChart, Tooltip, XAxis, YAxis,
} from 'recharts';
import moment from 'moment';
import {
  getCityWeatherByName,
  getDailyForecast,
} from '../../servises/weatherServices';
import {
  StyledCard,
  StyledIconWrapper,
  StyledLargeSpan,
  StyledLeftCard,
  StyledMediumSpan,
  StyledRightCard,
  StyledWrapper,
} from './DetailedPage.styles';
import { formatTemp } from '../utiles/utils';

const { Title } = Typography;

const DetailedPage = () => {
  const { cityName } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [cityInfo, setCityInfo] = useState(null);
  const [dailyCityForecast, setDailyCityForecast] = useState(null);
  useEffect(() => {
    setIsLoading(!isLoading);
    getCityWeatherByName(cityName)
      .then(({ coord: { lat, lon }, ...resData }) => {
        setCityInfo(resData);
        return getDailyForecast(lat, lon);
      })
      .then((dailyForecast) => {
        const forecastChartData = dailyForecast.hourly.map(({ dt, temp }) => ({
          date: `${moment(dt * 1000).format('dddd, HH:mm')}`,
          temp,
          formattedTemp: formatTemp(temp),
        }));
        setDailyCityForecast(forecastChartData);
      })
      .finally(() => setIsLoading(false));
  }, [cityName]);

  const getWeatherParam = (param) => {
    if (!cityInfo || !dailyCityForecast) {
      return '';
    }
    if (param === 'country') {
      return cityInfo.sys.country;
    }
    if (param === 'temp') {
      return formatTemp(cityInfo.main.temp);
    }

    if (param === 'feels_like') {
      return formatTemp(cityInfo.main.feels_like);
    }
    if (param === 'pressure') {
      return cityInfo.main.pressure;
    }
    if (param === 'icon') {
      return cityInfo.weather[0].icon;
    }
    if (param === 'main') {
      return cityInfo.weather[0].main;
    }

    if (param === 'sunset') {
      return moment(cityInfo.sys.sunset * 1000)
        .add(cityInfo.timezone)
        .add(cityInfo.timezone, 's')
        .format('HH:mm');
    }

    if (param === 'sunrise') {
      return moment(cityInfo.sys.sunrise * 1000)
        .add(cityInfo.timezone, 's')
        .format('HH:mm');
    }

    return '';
  };

  return (
    <Spin spinning={isLoading} tip="Loading...">
      <StyledWrapper>
        <Title>{`${cityName}, ${getWeatherParam('country')}`}</Title>
        <StyledCard>
          <StyledLeftCard hoverable={false}>
            <StyledIconWrapper>
              <img
                src={`http://openweathermap.org/img/wn/${getWeatherParam(
                  'icon',
                )}.png`}
                alt="icon"
              />
              <StyledLargeSpan level={4}>
                {getWeatherParam('main')}
              </StyledLargeSpan>
            </StyledIconWrapper>
            <StyledMediumSpan>
              {`Temperature:   ${getWeatherParam('temp')}`}
            </StyledMediumSpan>
            <StyledMediumSpan>
              {`Feels like:   ${getWeatherParam('feels_like')}`}
            </StyledMediumSpan>
            <StyledMediumSpan>
              {`Pressure: ${getWeatherParam('pressure')}`}
            </StyledMediumSpan>
            <StyledMediumSpan>
              {`Sunset: ${getWeatherParam('sunset')}`}
            </StyledMediumSpan>
            <StyledMediumSpan>
              {`Sunrise: ${getWeatherParam('sunrise')}`}
            </StyledMediumSpan>
          </StyledLeftCard>
          <StyledRightCard hoverable={false}>
            <LineChart data={dailyCityForecast} width={600} height={250}>
              <Line type="monotone" dataKey="temp" stroke="#8884d8" />
              <Tooltip
                content={({ payload, label }) => (
                  <div className="custom-tooltip">
                    <p className="label">
                      {`${label}: ${payload[0]
                        && formatTemp(payload[0].value)}`}
                    </p>
                  </div>
                )}
              />
              <XAxis dataKey="date" />
              <YAxis />
            </LineChart>
          </StyledRightCard>
        </StyledCard>
      </StyledWrapper>
    </Spin>
  );
};

export default DetailedPage;
