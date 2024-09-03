package com.mydiary.todo.controller;

import com.mydiary.auth.util.JwtTokenUtil;
import com.mydiary.todo.dto.TodoRequestDTO;
import com.mydiary.todo.dto.TodoResponseDTO;
import com.mydiary.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Value("${jwt.secret}")
    private String secretKey;

    @PostMapping
    public ResponseEntity<TodoResponseDTO> createTodo(@RequestParam String date,
                                                      @RequestBody TodoRequestDTO todoRequestDTO,
                                                      @RequestHeader("Authorization") String token) {
        String accessToken = token.substring(7); // "Bearer " 접두사 제거
        Long userId = jwtTokenUtil.getUserIdFromToken(accessToken, secretKey); // 유저 ID 추출

        TodoResponseDTO createdTodo = todoService.createTodo(date, todoRequestDTO, userId);
        return ResponseEntity.ok(createdTodo);
    }

    @GetMapping
    public ResponseEntity<List<TodoResponseDTO>> getTodos(
            @RequestParam(required = false) String date,
            @RequestParam(required = false) String yearMonth,
            @RequestHeader("Authorization") String token) {

        String accessToken = token.substring(7); // "Bearer " 접두사 제거
        Long userId = jwtTokenUtil.getUserIdFromToken(accessToken, secretKey); // 유저 ID 추출

        List<TodoResponseDTO> todos;

        if (date != null) {
            // date 파라미터가 있는 경우: 특정 날짜에 대한 TODO를 조회
            todos = todoService.getTodosByUserAndDate(userId, date);
        } else if (yearMonth != null) {
            // yearMonth 파라미터가 있는 경우: 특정 연도와 월에 대한 TODO를 조회
            todos = todoService.getTodosByUserAndMonth(userId, yearMonth);
        } else {
            // 두 파라미터가 모두 없는 경우: 잘못된 요청으로 처리
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }

        return ResponseEntity.ok(todos);
    }
    @GetMapping("/{id}")
    public ResponseEntity<TodoResponseDTO> getTodoById(@PathVariable Long id,
                                                       @RequestHeader("Authorization") String token) {
        String accessToken = token.substring(7); // "Bearer " 접두사 제거
        Long userId = jwtTokenUtil.getUserIdFromToken(accessToken, secretKey); // 유저 ID 추출

        TodoResponseDTO todo = todoService.getTodoByIdAndUser(id, userId);
        return todo != null ? ResponseEntity.ok(todo) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoResponseDTO> updateTodo(@PathVariable Long id,
                                                      @RequestBody TodoRequestDTO todoRequestDTO,
                                                      @RequestHeader("Authorization") String token) {
        String accessToken = token.substring(7); // "Bearer " 접두사 제거
        Long userId = jwtTokenUtil.getUserIdFromToken(accessToken, secretKey); // 유저 ID 추출

        TodoResponseDTO updatedTodo = todoService.updateTodoByIdAndUser(id, todoRequestDTO, userId);
        return updatedTodo != null ? ResponseEntity.ok(updatedTodo) : ResponseEntity.notFound().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteTodos(@RequestParam String date,
                                            @RequestHeader("Authorization") String token) {
        String accessToken = token.substring(7); // "Bearer " 접두사 제거
        Long userId = jwtTokenUtil.getUserIdFromToken(accessToken, secretKey); // 유저 ID 추출

        todoService.deleteTodosByUserAndDate(userId, date);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoById(@PathVariable Long id,
                                               @RequestHeader("Authorization") String token) {
        String accessToken = token.substring(7); // "Bearer " 접두사 제거
        Long userId = jwtTokenUtil.getUserIdFromToken(accessToken, secretKey); // 유저 ID 추출

        boolean deleted = todoService.deleteTodoByIdAndUser(id, userId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}