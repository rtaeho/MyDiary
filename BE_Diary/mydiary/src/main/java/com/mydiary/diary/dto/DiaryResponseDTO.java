package com.mydiary.diary.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DiaryResponseDTO {
    private Long id;
    private String title;
    private LocalDate date;
    private String content;
}