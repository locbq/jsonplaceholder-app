import React, {
  FC,
  useState,
  useEffect,
} from 'react';
import {
  Table,
  Space,
  Button,
  Select,
  Form,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import { getPostList } from 'apis/post/post';
import { Post } from 'types/post/Post';
import { userIdList } from './constant';
import { StyledForm } from './styles';
import DetailModal from '../Detail';

const PostList: FC = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post>({
    userId: 0,
    id: 0,
    title: '',
    body: '',
  });
  const [userId, setUserId] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await getPostList(userId || undefined);
        setPostList(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getPosts();
  }, [userId]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Content',
      dataIndex: 'body',
      key: 'body',
      ellipsis: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, data: Post, rowKey) => (
        <Space>
          <Button onClick={() => handleClickDetail(data)}>
            <EyeOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const handleClickFilter = (values): void => {
    setUserId(values.userId);
  };
  const handleClickDetail = (data: Post): void => {
    setVisible(true);
    setSelectedPost(data);
  };
  const handleClickCancelDetail = (): void => {
    setVisible(false);
  };

  return (
    <>
      <StyledForm
        layout="horizontal"
        onFinish={handleClickFilter}
      >
        <Space>
          <Form.Item
            label="User ID"
            name="userId"
          >
            <Select style={{ width: '120px' }}>
              {userIdList.map((id) => (
                <Select.Option
                  key={id}
                  value={id}
                >{id}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >Apply
            </Button>
          </Form.Item>
        </Space>
      </StyledForm>

      <Table
        columns={columns}
        dataSource={postList}
      />

      <DetailModal
        visible={visible}
        post={selectedPost}
        cancelDetail={handleClickCancelDetail}
      />
    </>
  );
};

export default PostList;
