import styled from 'styled-components';
import {
  Button, Card, Col, Row,
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

export const StyledCard = styled(Card)`
  height: 330px;
  .ant-card-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .ant-card-loading-content {
    width: 100%;
  }
  .ant-card-head-title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const EmptyStyledCard = styled(Card)`
  height: 330px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledRow = styled(Row)`
  margin: 0 !important;
  padding: 0 !important;
`;

export const StyledCloseButton = styled(Button)`
  position: absolute;
  top: -140px;
  right: -15px;
`;
export const StyledCloseIcon = styled(PlusOutlined)`
  transform: rotate(45deg);
`;

export const StyledSearchIcon = styled(SearchOutlined)`
  font-size: 16px;
  color: #1890ff;
`;
export const StyledAddButton = styled(Button)`
  size: 20px;
`;

export const StyledTempSpan = styled.span`
  font-size: 80px;
`;

export const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
