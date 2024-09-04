package com.mydiary.auth.util;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;
@Component
public class JwtTokenUtil {

    private static final long ACCESS_TOKEN_VALIDITY = 3600000; // 1 hour
    private static final long REFRESH_TOKEN_VALIDITY = 604800000; // 1 week

    // 1. AccessToken 생성
    public static String createAccessToken(Long userId, String secretKey) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    // 2. RefreshToken 생성
    public static String createRefreshToken(Long userId, String secretKey) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_VALIDITY))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    // 3. JWT 토큰에서 사용자 ID 추출
    public static Long getUserIdFromToken(String token, String secretKey) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
        return Long.parseLong(claims.getSubject());
    }

    // 4. JWT 토큰 유효성 검증
    public static boolean validateToken(String token, String secretKey) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException |
                 ExpiredJwtException ex) {
        }
        return false;
    }

}