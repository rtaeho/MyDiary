package com.mydiary.controller;

import com.mydiary.dto.DiaryRequestDTO;
import com.mydiary.dto.DiaryResponseDTO;
import com.mydiary.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diaries")
public class DiaryController {

    @Autowired
    private DiaryService diaryService;

    @PostMapping
    public ResponseEntity<DiaryResponseDTO> createDiary(@RequestBody DiaryRequestDTO diaryRequestDTO) {
        DiaryResponseDTO createdDiary = diaryService.createDiary(diaryRequestDTO);
        return ResponseEntity.ok(createdDiary);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiaryResponseDTO> getDiaryById(@PathVariable Long id) {
        DiaryResponseDTO diary = diaryService.getDiaryById(id);
        return diary != null ? ResponseEntity.ok(diary) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<DiaryResponseDTO>> getAllDiaries() {
        List<DiaryResponseDTO> diaries = diaryService.getAllDiaries();
        return ResponseEntity.ok(diaries);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiaryResponseDTO> updateDiary(@PathVariable Long id, @RequestBody DiaryRequestDTO diaryRequestDTO) {
        DiaryResponseDTO updatedDiary = diaryService.updateDiary(id, diaryRequestDTO);
        return updatedDiary != null ? ResponseEntity.ok(updatedDiary) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiary(@PathVariable Long id) {
        diaryService.deleteDiary(id);
        return ResponseEntity.noContent().build();
    }
}