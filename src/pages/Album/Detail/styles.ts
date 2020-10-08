import styled from 'styled-components';
import {
  Carousel,
  Button,
} from 'antd';

export const StyledCarousel = styled(Carousel)`
  width: 600px
`;

export const StyledButtonNext = styled(Button)`
  top: 50%;
  display: block;
  width: 40px !important;
  height: 40px !important;
  color: black !important;
  font-size: 20px;
  z-index: 1;
  background: #d9d9d9 !important;
  border-radius: 50%;
  right: 30px !important;
  & svg {
    font-size: 30px
  }
`;

export const StyledButtonPrev = styled(Button)`
  top: 50%;
  display: block;
  width: 40px !important;
  height: 40px !important;
  color: black !important;
  font-size: 20px;
  background: #d9d9d9 !important;
  z-index: 1;
  border-radius: 50%;
  left: 30px !important;
  & svg {
    font-size: 30px;
  }
`;
