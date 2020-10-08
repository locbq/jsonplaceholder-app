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

import { getTodosList } from 'apis/todos/todos';
import { getUserList } from 'apis/user/user';
import { Todo } from 'types/todos/Todo';
import { User } from 'types/user/User';
import DetailModal from '../Detail';
import {
  StyledForm,
  StyledTag,
} from './styles';
import {
  GREEN_COLOR_TAG,
  DEFAULT_COLOR_TAG,
} from '../constant';

interface IFilter {
  userId: number|undefined;
  completed: boolean|undefined;
}

const PostList: FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>({
    userId: 0,
    id: 0,
    title: '',
    completed: false,
  });
  const [userList, setUserList] = useState<User[]>([]);
  const [filter, setFilter] = useState<IFilter>({
    userId: undefined,
    completed: undefined,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const response = await getTodosList({
          userId: filter.userId,
          completed: filter.completed,
        });
        setTodoList(response.data);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    getPosts();
  }, [filter.userId, filter.completed]);
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
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      render: (text, data: Todo, rowKey) => (
        <StyledTag color={data.completed ? GREEN_COLOR_TAG : DEFAULT_COLOR_TAG}>
          {data.completed ? 'Done' : 'Pending'}
        </StyledTag>
      ),
    },
    {
      title: 'User',
      dataIndex: 'userId',
      key: 'userId',
      render: (text, data: Todo, rowKey) => (
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
      render: (text, data: Todo, rowKey) => (
        <Button onClick={() => handleClickDetail(data)}>
          <EyeOutlined />
        </Button>
      ),
    },
  ];

  const handleClickFilter = (values): void => {
    setFilter({
      userId: values.userId,
      completed: values.completed,
    });
  };
  const handleClickClearFilter = (): void => {
    setFilter({
      userId: undefined,
      completed: undefined,
    });
    form.resetFields();
  };
  const handleClickDetail = (data: Todo):void => {
    setVisible(true);
    setSelectedTodo(data);
  };
  const handleClickCancelDetail = ():void => {
    setVisible(false);
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
          <Form.Item
            label="Status"
            name="completed"
          >
            <Select style={{ width: '150px' }}>
              <Select.Option value="true">Done</Select.Option>
              <Select.Option value="false">Pending</Select.Option>
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
        dataSource={todoList}
      />

      <DetailModal
        visible={visible}
        todo={selectedTodo}
        onClose={handleClickCancelDetail}
      />
    </>
  );
};

export default PostList;
