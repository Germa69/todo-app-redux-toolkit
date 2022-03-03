import { Col, Row, Input, Button, Select, Tag } from "antd";
import Todo from "../Todo";
import { useDispatch, useSelector } from "react-redux";
import { selectors } from "../../redux";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import todoListSlicer from "./todosSlice";

export default function TodoList() {
  // Tạo ra 1 state lưu trữ dữ liệu hiện tại
  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("Medium");

  // useSelector: Lấy ra dữ liệu từ kho chung [Custom React hooks của react-redux]
  // useSelector nhận vào 1 selector [là 1 function dùng để lấy ra từng phần dữ liệu ở kho chung]
  const todoList = useSelector(selectors.todosRemainingSelector);

  // Hàm dispatch 1 action
  const dispatch = useDispatch();

  // Hàm xử lý khi click button
  const handleAddButtonClick = () => {
    // Khi dispatch 1 action thì thằng rootReducer được gọi
    dispatch(
      todoListSlicer.actions.addTodo({
        id: uuidv4(),
        name: todoName,
        priority: priority,
        completed: false,
      })
    );

    setTodoName("");
    setPriority("Medium");
  };

  // Hàm xử lý khi nội dung ô input thay đổi
  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };

  // Hàm xử lý khi chọn vào ô select
  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {/* Duyệt qua từng element của todoList để in ra 1 component tương ứng  */}
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            name={todo.name}
            prioriry={todo.priority}
            completed={todo.completed}
          />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input value={todoName} onChange={handleInputChange} />
          <Select
            defaultValue="Medium"
            value={priority}
            onChange={handlePriorityChange}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
