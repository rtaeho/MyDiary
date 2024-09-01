package com.mydiary.auth.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String nickname;

    public AuthResponse(String accessToken, String refreshToken, String nickname) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.nickname = nickname;
    }
}