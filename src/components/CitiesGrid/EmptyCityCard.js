import React, { useState } from 'react';
import {
  Button, Input, notification, Spin,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  EmptyStyledCard,
  StyledCloseButton,
  StyledCloseIcon,
  StyledSearchIcon,
} from './CitiesGrid.styles';
import { getCityWeatherByName } from '../../services/weatherServices';
import { setCityList } from '../../actions/cityActions';

const EmptyCityCard = () => {
  const [typingEnabled, setTypingEnabled] = useState(false);
  const [cityInputValue, setCityInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { cityList } = useSelector(({ cityReducer }) => cityReducer);

  const switchTypingEnabled = () => setTypingEnabled(!typingEnabled);
  const inputChange = (e) => setCityInputValue(e.target.value);
  const handleSearch = () => {
    setIsLoading(!isLoading);
    getCityWeatherByName(cityInputValue)
      .then((result) => {
        const cityIdsJson = localStorage.getItem('cityIds') || '[]';
        const cityIds = JSON.parse(cityIdsJson);
        if (cityIds.indexOf(result.id) !== -1) {
          return notification.info({
            message: `City ${result.name} is already in list`,
            placement: 'bottomLeft',
          });
        }
        const modifiedCityList = [...cityList];
        modifiedCityList.splice(modifiedCityList.length - 1, 0, result);
        dispatch(setCityList(modifiedCityList));
        const editedIds = JSON.stringify([...cityIds, result.id]);
        localStorage.setItem('cityIds', editedIds);
        return notification.success({
          message: `City ${result.name} was added`,
          placement: 'bottomLeft',
        });
      })
      .catch(() => notification.error({
        message: 'City is not found',
        placement: 'bottomLeft',
      }))
      .finally(() => {
        setIsLoading(false);
        switchTypingEnabled();
        setCityInputValue('');
      });
  };

  return (
    <EmptyStyledCard>
      <Spin spinning={isLoading} size="large">
        {typingEnabled ? (
          <>
            <StyledCloseButton
              shape="circle"
              icon={<StyledCloseIcon />}
              onClick={switchTypingEnabled}
            />
            <Input
              onPressEnter={handleSearch}
              onChange={inputChange}
              value={cityInputValue}
              suffix={<StyledSearchIcon onClick={handleSearch} />}
            />
          </>
        ) : (
          <>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={switchTypingEnabled}
            />
          </>
        )}
      </Spin>
    </EmptyStyledCard>
  );
};

export default EmptyCityCard;
