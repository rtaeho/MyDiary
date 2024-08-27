// src/main/java/com/mydiary/dto/TodoRequestDTO.java

package com.mydiary.todo.dto;

import lombok.Data;

@Data
public class TodoRequestDTO {
    private String title;
    private String description;
    private Boolean completed = false;
}