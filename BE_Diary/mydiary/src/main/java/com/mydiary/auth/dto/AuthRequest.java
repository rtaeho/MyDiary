package com.mydiary.auth.dto;

import lombok.Getter;

@Getter
public class AuthRequest {
    private final String code;

    public AuthRequest(String code) {
        this.code = code;
    }

}