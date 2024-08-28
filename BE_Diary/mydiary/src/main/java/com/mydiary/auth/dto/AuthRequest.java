package com.mydiary.auth.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String code;
    public AuthRequest(){}
    public AuthRequest(String code) {
        this.code = code;
    }

}