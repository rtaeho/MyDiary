package com.mydiary.todo.controller;

import com.mydiary.todo.dto.TodoRequestDTO;
import com.mydiary.todo.dto.TodoResponseDTO;
import com.mydiary.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    // CREATE
    @PostMapping
    public ResponseEntity<TodoResponseDTO> createTodo(@RequestParam String date, @RequestBody TodoRequestDTO todoRequestDTO) {
        TodoResponseDTO createdTodo = todoService.createTodo(date, todoRequestDTO);
        return ResponseEntity.ok(createdTodo);
    }

    // READ - All Todos or Todos by Date
    @GetMapping
    public ResponseEntity<List<TodoResponseDTO>> getTodos(@RequestParam(required = false) String date) {
        List<TodoResponseDTO> todos = (date != null) ? todoService.getTodosByDate(date) : todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }

    // READ - Todo by ID
    @GetMapping("/{id}")
    public ResponseEntity<TodoResponseDTO> getTodoById(@PathVariable Long id) {
        TodoResponseDTO todo = todoService.getTodoById(id);
        return todo != null ? ResponseEntity.ok(todo) : ResponseEntity.notFound().build();
    }

    // UPDATE - Todo by ID
    @PutMapping("/{id}")
    public ResponseEntity<TodoResponseDTO> updateTodo(@PathVariable Long id, @RequestBody TodoRequestDTO todoRequestDTO) {
        TodoResponseDTO updatedTodo = todoService.updateTodoById(id, todoRequestDTO);
        return updatedTodo != null ? ResponseEntity.ok(updatedTodo) : ResponseEntity.notFound().build();
    }

    // DELETE - All Todos or Todos by Date
    @DeleteMapping
    public ResponseEntity<Void> deleteTodos(@RequestParam(required = false) String date) {
        if (date != null) {
            todoService.deleteTodosByDate(date);
        } else {
            todoService.deleteAllTodos();
        }
        return ResponseEntity.noContent().build();
    }

    // DELETE - Todo by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoById(@PathVariable Long id) {
        boolean deleted = todoService.deleteTodoById(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}