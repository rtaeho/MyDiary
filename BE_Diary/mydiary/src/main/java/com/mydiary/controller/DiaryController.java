package com.mydiary.controller;

import com.mydiary.dto.DiaryRequestDTO;
import com.mydiary.dto.DiaryResponseDTO;
import com.mydiary.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diaries")
public class DiaryController {

    @Autowired
    private DiaryService diaryService;

    // 특정 날짜에 대한 일기를 생성
    @PostMapping
    public ResponseEntity<DiaryResponseDTO> createDiary(@RequestParam String date, @RequestBody DiaryRequestDTO diaryRequestDTO) {
        DiaryResponseDTO createdDiary = diaryService.createDiary(date, diaryRequestDTO);
        return ResponseEntity.ok(createdDiary);
    }

    // 특정 날짜에 대한 일기 또는 모든 일기를 반환
    @GetMapping
    public ResponseEntity<?> getDiary(@RequestParam(required = false) String date) {
        return (date != null)
                ? ResponseEntity.ok(diaryService.getDiaryByDate(date))
                : ResponseEntity.ok(diaryService.getAllDiaries());
    }

    // 특정 날짜에 대한 일기를 업데이트
    @PutMapping
    public ResponseEntity<DiaryResponseDTO> updateDiary(@RequestParam String date, @RequestBody DiaryRequestDTO diaryRequestDTO) {
        DiaryResponseDTO updatedDiary = diaryService.updateDiaryByDate(date, diaryRequestDTO);
        return updatedDiary != null ? ResponseEntity.ok(updatedDiary) : ResponseEntity.notFound().build();
    }

    // 특정 날짜에 대한 일기를 삭제
    @DeleteMapping
    public ResponseEntity<Void> deleteDiary(@RequestParam(required = false) String date) {
        if (date != null) {
            // 특정 날짜의 일기를 삭제하고, 삭제 성공 여부에 따라 응답을 반환
            boolean deleted = diaryService.deleteDiaryByDate(date);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } else {
            // 모든 일기를 삭제하고, 항상 성공 응답을 반환
            diaryService.deleteAllDiaries();
            return ResponseEntity.noContent().build();
        }
    }
}