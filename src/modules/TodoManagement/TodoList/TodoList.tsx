import { useState, useEffect } from "react";
import { Table, Space, Button, Select, Form } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getTodosList } from "store/todos.slice";
import { getUserList } from "store/users.slice";
import { Todo } from "types/todos/Todo";
import { RootState } from "store/store";
import { TodoDetailModal } from "../TodoDetailModal";
import { StyledForm, StyledTag } from "./TodoList.styles";
import {
  GREEN_COLOR_TAG,
  DEFAULT_COLOR_TAG
} from "../TodoManagement.constants";

interface IFilter {
  userId: number | undefined;
  completed: boolean | undefined;
}

export default function PostList() {
  const [selectedTodo, setSelectedTodo] = useState<Todo>({
    userId: 0,
    id: 0,
    title: "",
    completed: false
  });
  const [filter, setFilter] = useState<IFilter>({
    userId: undefined,
    completed: undefined
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { todoList, loading } = useSelector((state: RootState) => state.todos);
  const { userList } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(
      getTodosList({
        userId: filter.userId,
        completed: filter.completed
      })
    );
    dispatch(getUserList());
  }, [dispatch, filter.userId, filter.completed]);

  const handleClickFilter = (values): void => {
    setFilter({
      userId: values.userId,
      completed: values.completed
    });
  };
  const handleClickClearFilter = (): void => {
    setFilter({
      userId: undefined,
      completed: undefined
    });
    form.resetFields();
  };
  const handleClickDetail = (data: Todo): void => {
    setVisible(true);
    setSelectedTodo(data);
  };
  const handleClickCancelDetail = (): void => {
    setVisible(false);
  };

  const getUserName = (id: number): string => {
    const user = userList.find((data) => data.id === id);
    if (user) {
      return user.name;
    }
    return "";
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "80px"
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (text, data: Todo, rowKey) => (
        <StyledTag color={data.completed ? GREEN_COLOR_TAG : DEFAULT_COLOR_TAG}>
          {data.completed ? "Done" : "Pending"}
        </StyledTag>
      )
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
      render: (text, data: Todo, rowKey) => (
        <Link to={`/user/detail/${data.userId}`}>
          {getUserName(data.userId)}
        </Link>
      )
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "100px",
      render: (text, data: Todo, rowKey) => (
        <Button onClick={() => handleClickDetail(data)}>
          <EyeOutlined />
        </Button>
      )
    }
  ];

  return (
    <>
      <StyledForm layout="horizontal" form={form} onFinish={handleClickFilter}>
        <Space>
          <Form.Item label="User" name="userId">
            <Select style={{ width: "150px" }}>
              {userList.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="completed">
            <Select style={{ width: "150px" }}>
              <Select.Option value="true">Done</Select.Option>
              <Select.Option value="false">Pending</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
              <Button type="default" onClick={handleClickClearFilter}>
                Clear
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </StyledForm>

      <Table loading={loading} columns={columns} dataSource={todoList} />

      <TodoDetailModal
        visible={visible}
        todo={selectedTodo}
        onClose={handleClickCancelDetail}
      />
    </>
  );
}
