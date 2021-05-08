import React, {
  FC,
  useEffect,
} from 'react';
import {
  Table,
  Space,
  Button,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { User } from 'types/user/User';
import { getUsers } from 'store/users.slice';

interface StateType {
  users: {
    userList: User[];
    loading: boolean;
  }
}

const UserList: FC = () => {
  const dispatch = useDispatch();
  const { userList, loading } = useSelector((state: StateType) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '80px',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '100px',
      render: (text, data: User, rowKey) => (
        <Space>
          <Link to={`/user/detail/${data?.id}`}>
            <Button>
              <EyeOutlined />
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={userList}
        pagination={{ hideOnSinglePage: true }}
      />
    </>
  );
};

export default UserList;
