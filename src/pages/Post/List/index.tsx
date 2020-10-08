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
import { Link } from 'react-router-dom';

import { getPostList } from 'apis/post/post';
import { getUserList } from 'apis/user/user';
import { Post } from 'types/post/Post';
import { User } from 'types/user/User';
import { StyledForm } from './styles';

const PostList: FC = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [userId, setUserId] = useState<number|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const response = await getPostList(userId || undefined);
        setPostList(response.data);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    getPosts();
  }, [userId]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getUserList();
        setUserList(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '80px',
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
      title: 'User',
      dataIndex: 'userId',
      key: 'userId',
      render: (text, data: Post, rowKey) => (
        <Link to={`/user/detail/${data.userId}`}>
          {getUserName(data.userId)}
        </Link>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '100px',
      render: (text, data: Post, rowKey) => (
        <Link to={`/post/detail/${data.id}`}>
          <Button>
            <EyeOutlined />
          </Button>
        </Link>
      ),
    },
  ];

  const handleClickFilter = (values): void => {
    setUserId(values.userId);
  };
  const handleClickClearFilter = (): void => {
    setUserId(null);
    form.resetFields();
  };

  const getUserName = (id: number): string => {
    const user = userList.find((data) => data.id === id);
    if (user) {
      return user.name;
    }
    return '';
  };

  return (
    <>
      <StyledForm
        layout="horizontal"
        form={form}
        onFinish={handleClickFilter}
      >
        <Space>
          <Form.Item
            label="User"
            name="userId"
          >
            <Select style={{ width: '150px' }}>
              {userList.map((user) => (
                <Select.Option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
              >
                Apply
              </Button>
              <Button
                type="default"
                onClick={handleClickClearFilter}
              >
                Clear
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </StyledForm>

      <Table
        loading={isLoading}
        columns={columns}
        dataSource={postList}
      />
    </>
  );
};

export default PostList;
