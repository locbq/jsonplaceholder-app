import { Typography } from "antd";

import { StyledCard } from "./CommentCard.styles";

const { Paragraph } = Typography;

interface CommentCardProps {
  name: string;
  body: string;
  email: string;
}

export default function CommentCard({ name, body, email }: CommentCardProps) {
  return (
    <StyledCard>
      <Paragraph strong>{name}</Paragraph>
      <Paragraph>By {email}</Paragraph>
      <Paragraph>{body}</Paragraph>
    </StyledCard>
  );
}
