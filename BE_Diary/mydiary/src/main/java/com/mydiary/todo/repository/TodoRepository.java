package com.mydiary.todo.repository;

import com.mydiary.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByDate(LocalDate date);
    void deleteByDate(LocalDate date);
}