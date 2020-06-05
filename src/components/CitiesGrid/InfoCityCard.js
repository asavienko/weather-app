import React, { useState } from 'react';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { notification, Row, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { StyledCard, StyledCol, StyledTempSpan } from './CitiesGrid.styles';
import { setCityList } from '../../actions/cityActions';
import { getCityWeatherById } from '../../services/weatherServices';
import { formatTemp } from '../../untiles/untiles';

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
    notification.info({
      message: `City ${name} deleted`,
      placement: 'bottomLeft',
    });
  };

  const onReload = () => {
    setIsLoading(true);
    getCityWeatherById(currentId)
      .then((result) => {
        const indexInStore = cityList.findIndex(({ id }) => id === currentId);
        cityList.splice(indexInStore, 1, result);
        dispatch(setCityList(cityList));
      })
      .catch(() => notification.error({
        message: 'Some error has occur',
        placement: 'bottomLeft',
      }))
      .finally(() => setIsLoading(false));
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
        <Link to={`city/${name}`}>
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
