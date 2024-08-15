package com.mydiary.controller;

import com.mydiary.dto.TodoRequestDTO;
import com.mydiary.dto.TodoResponseDTO;
import com.mydiary.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoResponseDTO> createTodo(@RequestParam String date, @RequestBody TodoRequestDTO todoRequestDTO) {
        TodoResponseDTO createdTodo = todoService.createTodo(date, todoRequestDTO);
        return ResponseEntity.ok(createdTodo);
    }

    @GetMapping
    public ResponseEntity<List<TodoResponseDTO>> getTodosByDate(@RequestParam(required = false) String date) {
        List<TodoResponseDTO> todos;

        if (date != null) {
            todos = todoService.getTodosByDate(date);
        } else {
            todos = todoService.getAllTodos();  // 새로 추가된 메서드를 호출
        }

        return ResponseEntity.ok(todos);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteTodosByDate(@RequestParam(required = false) String date) {
        if (date != null) {
            todoService.deleteTodosByDate(date);
        } else {
            todoService.deleteAllTodos();
        }
        return ResponseEntity.noContent().build();
    }
}