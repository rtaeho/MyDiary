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
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Transactional
    public TodoResponseDTO createTodo(String date, TodoRequestDTO todoRequestDTO) {
        Todo todo = new Todo();
        todo.setTitle(todoRequestDTO.getTitle());
        todo.setDescription(todoRequestDTO.getDescription());
        todo.setDate(LocalDate.parse(date));
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

    @Transactional
    public void deleteTodosByDate(String date) {
        LocalDate localDate = LocalDate.parse(date);
        todoRepository.deleteByDate(localDate);
    }

    @Transactional
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
    private TodoResponseDTO convertToResponseDTO(Todo todo) {
        TodoResponseDTO dto = new TodoResponseDTO();
        dto.setId(todo.getId());
        dto.setTitle(todo.getTitle());
        dto.setDescription(todo.getDescription());
        dto.setDate(todo.getDate());
        return dto;
    }
}