import React from 'react';
import {
  Card,
  Typography,
} from 'antd';
import styled from 'styled-components';

const { Paragraph } = Typography;

const StyledCard = styled(Card)`
  margin: 1rem 0;
`;

interface CommentCardProps {
  name: string;
  body: string;
  email: string;
}

const CommentCard = ({
  name,
  body,
  email,
}: CommentCardProps) => (
  <StyledCard>
    <Paragraph strong>{name}</Paragraph>
    <Paragraph>By {email}</Paragraph>
    <Paragraph>{body}</Paragraph>
  </StyledCard>
);

export default CommentCard;
