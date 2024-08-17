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
    public ResponseEntity<List<TodoResponseDTO>> getTodos(@RequestParam(required = false) String date) {
        List<TodoResponseDTO> todos = (date != null) ? todoService.getTodosByDate(date) : todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteTodos(@RequestParam(required = false) String date) {

        if (date != null) {
            todoService.deleteTodosByDate(date);
        } else {
            todoService.deleteAllTodos();
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoById(@PathVariable Long id) {
        boolean deleted = todoService.deleteTodoById(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}