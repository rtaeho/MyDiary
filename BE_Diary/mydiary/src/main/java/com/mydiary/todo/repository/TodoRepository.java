package com.mydiary.todo.repository;

import com.mydiary.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUserIdAndDate(Long userId, LocalDate date);
    Optional<Todo> findByIdAndUserId(Long id, Long userId);

    List<Todo> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
}