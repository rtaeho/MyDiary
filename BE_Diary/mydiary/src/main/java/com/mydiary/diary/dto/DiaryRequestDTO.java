package com.mydiary.diary.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DiaryRequestDTO {
    private String title;
    private String content;
}