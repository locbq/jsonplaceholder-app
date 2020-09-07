import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import {
  Table,
  Space,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { getUserList } from 'apis/user/user';
import { User } from 'types/user/User';

const UserList: FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
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
      render: (text, data: User, rowKey) => (
        <Space>
          <Link to={`/user/detail/${data?.id}`}>
            <EyeOutlined />
          </Link>
        </Space>
      ),
    },
  ];

  const getUsers = async () => {
    try {
      const response = await getUserList();
      setUserList(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={userList}
      />
    </>
  );
};

export default UserList;