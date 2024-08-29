package com.mydiary.auth.filter;

import com.mydiary.auth.util.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final String secretKey;

    public JwtAuthenticationFilter(String secretKey) {
        this.secretKey = secretKey;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            // 1. 요청에서 JWT 토큰을 추출
            String token = resolveToken(request);

            // 2. 토큰이 존재하고 유효한지 확인
            if (token != null && JwtTokenUtil.validateToken(token, secretKey)) {
                // 3. 토큰이 유효하다면, 인증 객체 생성
                Long userId = JwtTokenUtil.getUserIdFromToken(token, secretKey);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userId, null, null);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 4. 스프링 시큐리티 컨텍스트에 설정
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            // 5. 다음 필터로 요청 전달
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException ex) {
            // 토큰이 만료된 경우 401 응답 반환
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT Token has expired");
        } catch (Exception ex) {
            // 다른 예외 처리
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication failed");
        }
    }

    // 요청에서 JWT 토큰을 추출하는 메서드
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        System.out.println(bearerToken);
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // "Bearer " 이후의 토큰 문자열을 반환
        }

        return null;
    }
}