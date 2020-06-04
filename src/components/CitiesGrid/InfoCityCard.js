import React, { useState } from 'react';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { notification, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { StyledCard, StyledCol, StyledTempSpan } from './CitiesGrid.styles';
import { setCityList } from '../../actions/cityActions';
import { getCityWeatherById } from '../../servises/weatherServices';

const InfoCityCard = ({ cityData, id: currentId }) => {
  const {
    name,
    weather: [{ main, icon }],
    main: { temp },
  } = cityData;

  const { cityList } = useSelector(({ cityReducer }) => cityReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = () => {
    const editedCityList = cityList.filter(({ id }) => id !== currentId);
    dispatch(setCityList(editedCityList));
    const cityIdsJson = localStorage.getItem('cityIds');
    const cityIds = JSON.parse(cityIdsJson);
    cityIds.splice(cityIds.indexOf(currentId), 1);
    localStorage.setItem('cityIds', JSON.stringify(cityIds));
    notification.info({ message: `City ${name} deleted` });
  };

  const onReload = () => {
    setIsLoading(true);
    getCityWeatherById(currentId)
      .then((result) => {
        const indexInStore = cityList.findIndex(({ id }) => id === currentId);
        cityList.splice(indexInStore, 1, result);
        dispatch(setCityList(cityList));
      })
      .catch(() => notification.error({ message: 'Some error has occur' }))
      .finally(() => setIsLoading(false));
  };
  const formatTemp = (currentTemp) => {
    const fixedCurrentTemp = currentTemp.toFixed();

    if (fixedCurrentTemp > 0) {
      return `+${fixedCurrentTemp}`;
    }
    if (fixedCurrentTemp < 0) {
      return `-${fixedCurrentTemp}`;
    }
    return fixedCurrentTemp;
  };
  return (
    <StyledCard
      title={name}
      actions={[
        <ReloadOutlined key="reload" onClick={onReload} />,
        <DeleteOutlined key="delete" onClick={onDelete} />,
      ]}
    >
      <Spin spinning={isLoading} size="large">
        <Link to={`/${name}`}>
          <Row justify="center" align="middle">
            <StyledCol span={12}>
              <img
                src={`http://openweathermap.org/img/wn/${icon}.png`}
                alt={icon}
              />
            </StyledCol>
            <StyledCol span={12}>
              <span>{main}</span>
            </StyledCol>
            <StyledCol span={24}>
              <StyledTempSpan>{formatTemp(temp)}</StyledTempSpan>
            </StyledCol>
          </Row>
        </Link>
      </Spin>
    </StyledCard>
  );
};

export default InfoCityCard;
