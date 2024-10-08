package com.mydiary.auth.controller;

import com.mydiary.auth.dto.*;
import com.mydiary.auth.service.KakaoService;
import com.mydiary.auth.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final KakaoService kakaoService;

    @Value("${jwt.secret}")
    private String secretKey;

    public AuthController(KakaoService kakaoService) {
        this.kakaoService = kakaoService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> kakaoLogin(@RequestBody AuthRequest authRequest) {
        String code = authRequest.getCode();

        // 인가 코드로 카카오 액세스 토큰을 획득
        KakaoTokenResponse kakaoToken = kakaoService.getKakaoToken(code);
        if (kakaoToken == null) {
            return ResponseEntity.status(500).body(null); // 토큰 획득 실패 시 오류 응답
        }

        // 액세스 토큰으로 사용자 프로필 조회
        KakaoUserProfile userProfile = kakaoService.getUserProfile(kakaoToken.getAccess_token());
        if (userProfile == null) {
            return ResponseEntity.status(500).body(null); // 프로필 획득 실패 시 오류 응답
        }

        // 사용자 정보로 JWT 토큰 생성 및 회원 가입 또는 로그인 처리
        AuthResponse authResponse = kakaoService.createJwtToken(userProfile);
        if (authResponse == null) {
            return ResponseEntity.status(500).body(null); // 토큰 생성 실패 시 오류 응답
        }

        // JWT 토큰을 클라이언트에 응답으로 전달
        return ResponseEntity.ok(authResponse);
    }

    // Refresh Token을 사용해 새로운 Access Token 및 Refresh Token을 발급하는 엔드포인트
    @PostMapping("/refresh-token")
    public ResponseEntity<Map<String, String>> refreshAccessToken(@RequestBody RefreshTokenRequest tokenRefreshRequest) {
        String refreshToken = tokenRefreshRequest.getRefreshToken();

        // Refresh Token 유효성 검증
        if (JwtTokenUtil.validateToken(refreshToken, secretKey)) {
            Long userId = JwtTokenUtil.getUserIdFromToken(refreshToken, secretKey);

            // 새로운 Access Token 및 Refresh Token 생성
            String newAccessToken = JwtTokenUtil.createAccessToken(userId, secretKey);
            String newRefreshToken = JwtTokenUtil.createRefreshToken(userId, secretKey);

            // 새로운 토큰들을 반환
            Map<String, String> tokens = new HashMap<>();
            tokens.put("accessToken", newAccessToken);
            tokens.put("refreshToken", newRefreshToken);

            return ResponseEntity.ok(tokens);
        } else {
            return ResponseEntity.status(401).body(null); // Refresh Token이 유효하지 않음
        }
    }
}