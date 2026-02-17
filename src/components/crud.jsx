import {
  addTodo,
  deleteTodo,
  editTodo,
  todoToggle,
} from "@/features/todo/todoSlice";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Input } from "@/ui/input";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Crud = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (text.trim === "") return;

    dispatch(addTodo(text));
    setText("");
  };

  const handleSave = (id) => {
    if (editText.trim() === "") return;

    dispatch(editTodo({ id, newText: editText }));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-20">
      <Card className="w-[400px] p-6 shadow-lg">
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold text-center">Todo App</h1>
          <div className="flex gap-2">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write todo..."
            />
            <Button onClick={handleAdd}>Add</Button>
          </div>

          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="bg-white p-2 rounded-md shadow-sm flex justify-between items-center"
              >
                {editingId === todo.id ? (
                  <div className="flex gap-2 w-full">
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSave(todo.id);
                        }
                      }}
                    />

                    <Button size="sm" onClick={() => handleSave(todo.id)}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <>
                    <span
                      onClick={() => dispatch(todoToggle(todo.id))}
                      className={`cursor-pointer flex-1 ${
                        todo.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {todo.text}
                    </span>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(todo.id);
                          setEditText(todo.text);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => dispatch(deleteTodo(todo.id))}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Crud;
