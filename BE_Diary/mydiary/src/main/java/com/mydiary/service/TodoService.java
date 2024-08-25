package com.mydiary.service;

import com.mydiary.dto.TodoRequestDTO;
import com.mydiary.dto.TodoResponseDTO;
import com.mydiary.model.Todo;
import com.mydiary.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public TodoResponseDTO createTodo(String date, TodoRequestDTO todoRequestDTO) {
        Todo todo = new Todo();
        todo.setTitle(todoRequestDTO.getTitle());
        todo.setDescription(todoRequestDTO.getDescription());
        todo.setDate(LocalDate.parse(date));
        todo.setCompleted(todoRequestDTO.getCompleted());
        Todo savedTodo = todoRepository.save(todo);
        return convertToResponseDTO(savedTodo);
    }

    @Transactional(readOnly = true)
    public List<TodoResponseDTO> getTodosByDate(String date) {
        LocalDate localDate = LocalDate.parse(date);
        List<Todo> todos = todoRepository.findByDate(localDate);
        return todos.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TodoResponseDTO> getAllTodos() {
        List<Todo> todos = todoRepository.findAll();
        return todos.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TodoResponseDTO getTodoById(Long id) {
        Optional<Todo> todoOptional = todoRepository.findById(id);
        if (todoOptional.isPresent()) {
            return convertToResponseDTO(todoOptional.get());
        }
        return null;
    }

    public void deleteTodosByDate(String date) {
        LocalDate localDate = LocalDate.parse(date);
        todoRepository.deleteByDate(localDate);
    }

    public void deleteAllTodos() {
        todoRepository.deleteAll();
    }

    public boolean deleteTodoById(Long id) {
        Optional<Todo> todo = todoRepository.findById(id);
        if (todo.isPresent()) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public TodoResponseDTO updateTodoById(Long id, TodoRequestDTO todoRequestDTO) {
        Optional<Todo> todoOptional = todoRepository.findById(id);
        if (todoOptional.isPresent()) {
            Todo todo = todoOptional.get();
            todo.setTitle(todoRequestDTO.getTitle());
            todo.setDescription(todoRequestDTO.getDescription());
            todo.setCompleted(todoRequestDTO.getCompleted());
            Todo updatedTodo = todoRepository.save(todo);
            return convertToResponseDTO(updatedTodo);
        }
        return null; // Todo가 없으면 null을 반환
    }

    private TodoResponseDTO convertToResponseDTO(Todo todo) {
        TodoResponseDTO dto = new TodoResponseDTO();
        dto.setId(todo.getId());
        dto.setTitle(todo.getTitle());
        dto.setDescription(todo.getDescription());
        dto.setDate(todo.getDate());
        dto.setCompleted(todo.getCompleted());
        return dto;
    }
}