package com.mydiary.dto;

import lombok.Data;

@Data
public class TodoRequestDTO {
    private String title;
    private String description;
}