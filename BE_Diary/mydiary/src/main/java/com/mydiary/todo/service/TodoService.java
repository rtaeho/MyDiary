package com.mydiary.todo.service;

import com.mydiary.todo.dto.TodoRequestDTO;
import com.mydiary.todo.dto.TodoResponseDTO;
import com.mydiary.todo.model.Todo;
import com.mydiary.todo.repository.TodoRepository;
import com.mydiary.user.model.User;
import com.mydiary.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private UserRepository userRepository;

    public TodoResponseDTO createTodo(String date, TodoRequestDTO todoRequestDTO, Long userId) {
        LocalDate todoDate = LocalDate.parse(date);
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            Todo todo = new Todo();
            todo.setTitle(todoRequestDTO.getTitle());
            todo.setDescription(todoRequestDTO.getDescription());
            todo.setDate(todoDate);
            todo.setCompleted(todoRequestDTO.getCompleted());
            todo.setUser(user.get());

            Todo savedTodo = todoRepository.save(todo);
            return convertToResponseDTO(savedTodo);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Transactional(readOnly = true)
    public List<TodoResponseDTO> getTodosByUserAndDate(Long userId, String date) {
        LocalDate todoDate = LocalDate.parse(date);
        List<Todo> todos = todoRepository.findByUserIdAndDate(userId, todoDate);
        return todos.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TodoResponseDTO getTodoByIdAndUser(Long id, Long userId) {
        Optional<Todo> todoOptional = todoRepository.findByIdAndUserId(id, userId);
        return todoOptional.map(this::convertToResponseDTO).orElse(null);
    }

    public TodoResponseDTO updateTodoByIdAndUser(Long id, TodoRequestDTO todoRequestDTO, Long userId) {
        Optional<Todo> todoOptional = todoRepository.findByIdAndUserId(id, userId);

        if (todoOptional.isPresent()) {
            Todo todo = todoOptional.get();
            todo.setTitle(todoRequestDTO.getTitle());
            todo.setDescription(todoRequestDTO.getDescription());
            todo.setCompleted(todoRequestDTO.getCompleted());
            Todo updatedTodo = todoRepository.save(todo);
            return convertToResponseDTO(updatedTodo);
        } else {
            return null;
        }
    }

    public void deleteTodosByUserAndDate(Long userId, String date) {
        LocalDate todoDate = LocalDate.parse(date);
        List<Todo> todos = todoRepository.findByUserIdAndDate(userId, todoDate);
        todoRepository.deleteAll(todos);
    }

    public boolean deleteTodoByIdAndUser(Long id, Long userId) {
        Optional<Todo> todoOptional = todoRepository.findByIdAndUserId(id, userId);
        if (todoOptional.isPresent()) {
            todoRepository.delete(todoOptional.get());
            return true;
        }
        return false;
    }
    // userId와 yearMonth를 사용해 해당 월의 Todo를 가져오는 메서드
    public List<TodoResponseDTO> getTodosByUserAndMonth(Long userId, String yearMonth) {
        // "YYYY-MM" 형식의 yearMonth를 기준으로 해당 월의 시작일과 마지막일을 계산
        YearMonth ym = YearMonth.parse(yearMonth);
        LocalDate startOfMonth = ym.atDay(1); // 월의 첫날
        LocalDate endOfMonth = ym.atEndOfMonth(); // 월의 마지막 날

        // 특정 유저의 해당 월에 속하는 모든 TODO를 가져옴
        List<Todo> todos = todoRepository.findByUserIdAndDateBetween(userId, startOfMonth, endOfMonth);

        // Todo 엔티티를 TodoResponseDTO로 변환하여 반환
        return todos.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
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