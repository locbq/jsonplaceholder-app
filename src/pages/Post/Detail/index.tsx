import React, { FC } from 'react';
import {
  Modal,
  Space,
  Typography,
} from 'antd';
import { Post } from 'types/post/Post';

const {
  Text,
  Paragraph,
} = Typography;

type PostDetailProps = {
  visible: boolean;
  post: Post;
  cancelDetail: () => void;
};

const PostDetail: FC<PostDetailProps> = ({
  visible,
  post,
  cancelDetail,
}) => (
  <Modal
    visible={visible}
    footer={false}
    title={`${post.title}`}
    onCancel={cancelDetail}
  >
    <Space direction="vertical">
      <Space direction="vertical">
        <Text strong>Title</Text>
        <Paragraph>{post.title}</Paragraph>
      </Space>
      <Space direction="vertical">
        <Text strong>Content</Text>
        <Paragraph>{post.body}</Paragraph>
      </Space>
    </Space>
  </Modal>
);

export default PostDetail;
