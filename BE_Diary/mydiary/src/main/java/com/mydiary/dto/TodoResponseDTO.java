// src/main/java/com/mydiary/dto/TodoResponseDTO.java

package com.mydiary.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class TodoResponseDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate date;
    private Boolean completed = false;
}