import React, {
  FC,
  useState,
  useEffect,
} from 'react';
import {
  Table,
  Space,
  Button,
} from 'antd';

import { getPostList } from 'apis/post/post';
import { Post } from 'types/post/Post';
import { EyeOutlined } from '@ant-design/icons';

const PostList: FC = () => {
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    getPosts();
  }, []);

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
          <Button>
            <EyeOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const getPosts = async () => {
    try {
      const response = await getPostList();
      setPostList(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={postList}
      />
    </>
  );
};

export default PostList;
