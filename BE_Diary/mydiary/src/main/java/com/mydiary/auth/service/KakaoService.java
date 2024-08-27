package com.mydiary.auth.service;

import com.mydiary.auth.dto.KakaoTokenResponse;
import com.mydiary.auth.dto.KakaoUserProfile;
import com.mydiary.auth.dto.AuthResponse;
import com.mydiary.user.model.User;
import com.mydiary.user.repository.UserRepository;
import com.mydiary.auth.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoService {

    @Value("${kakao.key.client-id}")
    private String clientId;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    @Value("${jwt.token.secret-key}")
    private String secretKey;

    private final UserRepository userRepository;

    public KakaoService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public KakaoTokenResponse getKakaoToken(String code) {
        RestTemplate restTemplate = new RestTemplate();

        String tokenUri = "https://kauth.kakao.com/oauth/token";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded");

        String body = "grant_type=authorization_code"
                + "&client_id=" + clientId
                + "&redirect_uri=" + redirectUri
                + "&code=" + code;

        HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<KakaoTokenResponse> responseEntity = restTemplate.exchange(
                tokenUri,
                HttpMethod.POST,
                requestEntity,
                KakaoTokenResponse.class
        );

        return responseEntity.getBody();
    }

    public KakaoUserProfile getUserProfile(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        String profileUri = "https://kapi.kakao.com/v2/user/me";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<KakaoUserProfile> responseEntity = restTemplate.exchange(
                profileUri,
                HttpMethod.GET,
                requestEntity,
                KakaoUserProfile.class
        );

        return responseEntity.getBody();
    }

    public AuthResponse createJwtToken(KakaoUserProfile userProfile) {
        // properties에서 nickname을 가져옴
        String nickname = userProfile.getProperties() != null ? userProfile.getProperties().getNickname() : null;

        // 만약 properties에서 nickname이 null이라면 kakao_account.profile에서 가져옴
        if (nickname == null && userProfile.getKakao_account() != null && userProfile.getKakao_account().getProfile() != null) {
            nickname = userProfile.getKakao_account().getProfile().getNickname();
        }

        // nickname이 null인 경우 기본값 설정
        nickname = nickname != null ? nickname : "Default Nickname";

        String finalNickname = nickname;
        User user = userRepository.findByKakaoId(userProfile.getId())
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setKakaoId(userProfile.getId());
                    newUser.setNickname(finalNickname);
                    return userRepository.save(newUser);
                });

        // JWT 토큰 생성
        String jwtToken = JwtTokenUtil.createToken(user.getId(), secretKey);

        // AuthResponse 객체로 반환
        return new AuthResponse(jwtToken, user.getNickname());
    }
}