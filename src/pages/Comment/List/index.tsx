import React, {
  useState,
  useEffect,
} from 'react';
import { EyeOutlined } from '@ant-design/icons';
import {
  Button,
  Space,
  Table,
} from 'antd';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getComments } from 'store/comments.slice';
import { Comment } from 'types/comment/Comment';
import { RootState } from 'store/store';
import DetailModal from '../Detail';

const CommentList = () => {
  const [selectedComment, setSelectedComment] = useState<Comment>({
    postId: 0,
    id: 0,
    name: '',
    email: '',
    body: '',
  });
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { commentList, loading } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '80px',
    },
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
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
      width: '100px',
      render: (text, data: Comment, rowKey) => (
        <Space>
          <Button onClick={() => handleClickDetail(data)}>
            <EyeOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const handleClickDetail = (data: Comment): void => {
    setSelectedComment(data);
    setVisible(true);
  };
  const handleClickCancelDetail = (): void => {
    setVisible(false);
  };

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={commentList}
      />

      <DetailModal
        visible={visible}
        comment={selectedComment}
        onClose={handleClickCancelDetail}
      />
    </>
  );
};

export default CommentList;
