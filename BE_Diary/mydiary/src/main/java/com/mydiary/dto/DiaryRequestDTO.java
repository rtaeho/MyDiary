package com.mydiary.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DiaryRequestDTO {
    private String title;
    private LocalDate date;
    private String content;
}