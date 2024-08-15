package com.mydiary.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TodoResponseDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate date; // 날짜 필드 추가
}