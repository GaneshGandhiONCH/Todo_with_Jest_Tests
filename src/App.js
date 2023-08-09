import React, { useRef, useState } from "react";
import { ListGroup, Col, Stack, Container } from "react-bootstrap";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "./reducer/todoSlice";
import CustomModel from "./components/CustomModel";
import TodoForm from "./components/TodoForm";

function App() {
  const dispatch = useDispatch();
  const todoListItems = useSelector((state) => state.todo);
  const [editModelVisible, setEditModelVisible] = useState(false);
  const [editData, setEditData] = useState("");
  const ref = useRef();

  const onSubmit = (values) => {
    if (editModelVisible) {
      dispatch(editTodo({ id: editData.id, ...values }));
      ref.current.resetForm();
      setEditModelVisible(false);
      setEditData("");
    } else {
      values.id = Math.floor(Math.random() * 100 - 1);
      dispatch(addTodo(values));
      ref.current.resetForm();
    }
  };

  const deleteHandler = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <div>
        <Container>
          <h1>Todo App</h1>
          <Stack direction="horizontal" gap={5} className="space-top-20">
            {/* get output todo & edit&delete btn */}
            <Col>
              <ListGroup as="ol" numbered>
                {todoListItems?.todo?.length > 0 &&
                  todoListItems?.todo?.map((item, index) => {
                    return (
                      <ListGroup.Item as="li" key={index}>
                        <div className="list-title">
                          <span id={`title-${index}`}>{item.title}</span>
                          <div className="action-icons">
                            <span
                              className="icon"
                              id={`edit-${index}`}
                              onClick={() => {
                                setEditModelVisible(true);
                                setEditData(item);
                              }}
                            >
                              Edit
                            </span>
                            <span
                              className="icon"
                              id={`del-${index}`}
                              onClick={() => deleteHandler(item.id)}
                            >
                              Delete
                            </span>
                          </div>
                        </div>
                        <div id={`content-${index}`}>{item.content}</div>
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
            </Col>

            {/* input todo & add btn */}
            <Col>
              <TodoForm onSubmit={onSubmit} ref={ref} />
            </Col>
          </Stack>
          {/* Edit modal */}
          <CustomModel
            title={"Edit Todo"}
            visible={editModelVisible}
            onClose={() => setEditModelVisible(false)}
            onSave={() => {
              
              ref.current.submitForm();
            }}
          >
            <TodoForm
              showAdd={false}
              editData={editData}
              onSubmit={onSubmit}
              ref={ref}
            />
          </CustomModel>
        </Container>
      </div>
    </div>
  );
}

export default App;
