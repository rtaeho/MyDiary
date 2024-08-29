package com.mydiary.diary.controller;

import com.mydiary.auth.util.JwtTokenUtil;
import com.mydiary.diary.dto.DiaryRequestDTO;
import com.mydiary.diary.dto.DiaryResponseDTO;
import com.mydiary.diary.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/diaries")
public class DiaryController {

    @Autowired
    private DiaryService diaryService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Value("${jwt.secret}")
    private String secretKey;

    @PostMapping
    public ResponseEntity<DiaryResponseDTO> createDiary(@RequestParam String date,
                                                        @RequestBody DiaryRequestDTO diaryRequestDTO,
                                                        @RequestHeader("Authorization") String token) {
        // "Bearer " 접두사 제거
        String accessToken = token.substring(7);

        // 토큰에서 유저 ID 추출
        Long userId = jwtTokenUtil.getUserIdFromToken(accessToken, secretKey);

        // 해당 유저와 날짜로 다이어리 생성
        DiaryResponseDTO createdDiary = diaryService.createDiary(date, diaryRequestDTO, userId);
        return ResponseEntity.ok(createdDiary);
    }

    @GetMapping
    public ResponseEntity<DiaryResponseDTO> getDiary(@RequestParam String date,
                                      @RequestHeader("Authorization") String token) {
        // "Bearer " 접두사 제거
        String accessToken = token.substring(7);

        // 토큰에서 유저 ID 추출
        Long userId = jwtTokenUtil.getUserIdFromToken(accessToken, secretKey);

        // 해당 유저와 날짜로 다이어리 조회
        DiaryResponseDTO diary = diaryService.getDiaryByUserAndDate(userId, date);
        return diary != null ? ResponseEntity.ok(diary) : ResponseEntity.ok(null);
    }

    @PutMapping
    public ResponseEntity<DiaryResponseDTO> updateDiary(@RequestParam String date,
                                                        @RequestBody DiaryRequestDTO diaryRequestDTO,
                                                        @RequestHeader("Authorization") String token) {
        // "Bearer " 접두사 제거
        String accessToken = token.substring(7);

        // 토큰에서 유저 ID 추출
        Long userId = jwtTokenUtil.getUserIdFromToken(accessToken, secretKey);

        // 해당 유저와 날짜로 다이어리 업데이트
        DiaryResponseDTO updatedDiary = diaryService.updateDiaryByUserAndDate(userId, date, diaryRequestDTO);
        return updatedDiary != null ? ResponseEntity.ok(updatedDiary) : ResponseEntity.notFound().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteDiary(@RequestParam String date,
                                            @RequestHeader("Authorization") String token) {
        // "Bearer " 접두사 제거
        String accessToken = token.substring(7);

        // 토큰에서 유저 ID 추출
        Long userId = jwtTokenUtil.getUserIdFromToken(accessToken, secretKey);

        // 해당 유저와 날짜로 다이어리 삭제
        boolean deleted = diaryService.deleteDiaryByUserAndDate(userId, date);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}