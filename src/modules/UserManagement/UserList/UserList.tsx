import { useEffect } from "react";
import { Table, Space, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { User } from "types/user/User";
import { getUserList } from "store/users.slice";
import { RootState, AppDispatch } from "store/store";

export default function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const { userList, listLoading: loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "80px"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "100px",
      render: (text, data: User, rowKey) => (
        <Space>
          <Link to={`/user/detail/${data?.id}`}>
            <Button>
              <EyeOutlined />
            </Button>
          </Link>
        </Space>
      )
    }
  ];

  return (
    <Table
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={userList}
      pagination={{ hideOnSinglePage: true }}
    />
  );
}
