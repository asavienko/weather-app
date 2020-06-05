import styled from 'styled-components';
import { Button, Card } from 'antd';

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const StyledCard = styled(Card)`
  min-width: 800px;
`;

export const StyledLeftCard = styled(Card.Grid)`
  width: 22%;
  display: flex;
  flex-direction: column;
  height: 298px;
  justify-content: space-between;
`;
export const StyledRightCard = styled(Card.Grid)`
  width: 78%;
`;

export const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLargeSpan = styled.span`
  font-size: 30px;
  font-weight: 400;
`;

export const StyledMediumSpan = styled.span`
  font-size: 16px;
`;

export const StyledBackButton = styled(Button)`
position: fixed;
    bottom: 20px;
`;
