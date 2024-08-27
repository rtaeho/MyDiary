package com.mydiary.auth.controller;

import com.mydiary.auth.dto.AuthRequest;
import com.mydiary.auth.dto.AuthResponse;
import com.mydiary.auth.dto.KakaoTokenResponse;
import com.mydiary.auth.dto.KakaoUserProfile;
import com.mydiary.auth.service.KakaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final KakaoService kakaoService;

    public AuthController(KakaoService kakaoService) {
        this.kakaoService = kakaoService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> kakaoLogin(@RequestBody AuthRequest authRequest) {
        String code = authRequest.getCode();

        // 인가 코드로 카카오 액세스 토큰을 획득
        KakaoTokenResponse kakaoToken = kakaoService.getKakaoToken(code);

        // 액세스 토큰으로 사용자 프로필 조회
        KakaoUserProfile userProfile = kakaoService.getUserProfile(kakaoToken.getAccess_token());

        // 사용자 정보로 JWT 토큰 생성 및 회원 가입 또는 로그인 처리
        String jwtToken = kakaoService.createJwtToken(userProfile);

        // JWT 토큰을 클라이언트에 응답으로 전달
        return ResponseEntity.ok(new AuthResponse(jwtToken));
    }
}