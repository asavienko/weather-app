import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Spin } from 'antd';
import EmptyCityCard from './EmptyCityCard';
import { StyledRow } from './CitiesGrid.styles';
import { getCityWeatherById } from '../../services/weatherServices';
import { setCityList } from '../../actions/cityActions';
import InfoCityCard from './InfoCityCard';

const CitiesGrid = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { cityList } = useSelector(({ cityReducer }) => cityReducer);
  useEffect(() => {
    if (cityList.length > 1) {
      return;
    }
    const jsonLocalIds = localStorage.getItem('cityIds');
    const localIds = JSON.parse(jsonLocalIds);
    if (!localIds) {
      return;
    }

    setIsLoading(!isLoading);
    Promise.all(localIds.map((id) => getCityWeatherById(id)))
      .then((res) => dispatch(setCityList([...res, ...cityList])))
      .finally(() => setIsLoading(false));
  }, [dispatch, cityList]);
  return (
    <Spin spinning={isLoading} tip="Loading...">
      <StyledRow gutter={[16, 16]}>
        {cityList.map(({ id, ...restCityData }) => (
          <Col xs={24} sm={12} md={8} lg={6} key={id}>
            {id === 0 ? (
              <EmptyCityCard />
            ) : (
              <InfoCityCard cityData={restCityData} id={id} />
            )}
          </Col>
        ))}
      </StyledRow>
    </Spin>
  );
};

export default CitiesGrid;
