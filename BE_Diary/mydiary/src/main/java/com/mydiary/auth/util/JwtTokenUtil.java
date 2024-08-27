package com.mydiary.auth.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtTokenUtil {

    public static String createToken(Long userId, String secretKey) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1시간 유효기간
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }
}