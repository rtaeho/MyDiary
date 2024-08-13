package com.mydiary.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ScheduleResponseDTO {
    private Long id;
    private String title;
    private LocalDate date;
    private String description;
}