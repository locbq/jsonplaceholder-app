import React, { FC } from 'react';
import {
  Modal,
  Typography,
} from 'antd';

import { Comment } from 'types/comment/Comment';

const { Paragraph } = Typography;

interface DetailModalProps {
  visible: boolean;
  comment: Comment;
  onClose: () => void;
}

const DetailModal: FC<DetailModalProps> = ({
  visible,
  comment,
  onClose,
}) => (
  <Modal
    visible={visible}
    footer={false}
    title={comment.name}
    onCancel={onClose}
  >
    <Paragraph strong>Title</Paragraph>
    <Paragraph>{comment.name}</Paragraph>
    <Paragraph strong>Email</Paragraph>
    <Paragraph>{comment.email}</Paragraph>
    <Paragraph strong>Content</Paragraph>
    <Paragraph>{comment.body}</Paragraph>
  </Modal>
);

export default DetailModal;
