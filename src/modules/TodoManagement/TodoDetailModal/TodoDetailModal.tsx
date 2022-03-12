import { Modal, Space, Typography } from "antd";

import { Todo } from "types/todos/Todo";
import { StyledTag } from "./TodoDetailModal.styles";
import {
  GREEN_COLOR_TAG,
  DEFAULT_COLOR_TAG
} from "../TodoManagement.constants";

const { Paragraph, Text } = Typography;

interface DetailModalProps {
  visible: boolean;
  todo: Todo;
  onClose: () => void;
}

export default function TodoDetailModal({
  visible,
  todo,
  onClose
}: DetailModalProps) {
  return (
    <Modal
      visible={visible}
      footer={false}
      title={todo.title}
      onCancel={onClose}
    >
      <Paragraph strong>Title</Paragraph>
      <Paragraph>{todo.title}</Paragraph>
      <Space>
        <Text strong>Status</Text>
        <StyledTag color={todo.completed ? GREEN_COLOR_TAG : DEFAULT_COLOR_TAG}>
          {todo.completed ? "Done" : "Pending"}
        </StyledTag>
      </Space>
    </Modal>
  );
}
