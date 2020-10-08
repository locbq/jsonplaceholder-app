import React, {
  FC,
  useState,
  useEffect,
} from 'react';
import { EyeOutlined } from '@ant-design/icons';
import {
  Button,
  Space,
  Table,
} from 'antd';

import { getCommentList } from 'apis/comment/comment';
import { Comment } from 'types/comment/Comment';
import DetailModal from '../Detail';

const CommentList: FC = () => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<Comment>({
    postId: 0,
    id: 0,
    name: '',
    email: '',
    body: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);
      try {
        const response = await getCommentList();
        setCommentList(response.data);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    getComments();
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
        loading={isLoading}
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
