package com.mydiary.auth.dto;

public class KakaoUserProfile {
    private Long id;
    private String nickname;  // 닉네임만 포함

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}