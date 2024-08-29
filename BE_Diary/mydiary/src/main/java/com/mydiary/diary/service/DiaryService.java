package com.mydiary.diary.service;

import com.mydiary.diary.dto.DiaryRequestDTO;
import com.mydiary.diary.dto.DiaryResponseDTO;
import com.mydiary.diary.model.Diary;
import com.mydiary.diary.repository.DiaryRepository;
import com.mydiary.user.model.User;
import com.mydiary.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class DiaryService {

    @Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private UserRepository userRepository;

    public DiaryResponseDTO createDiary(String date, DiaryRequestDTO diaryRequestDTO, Long userId) {
        LocalDate diaryDate = LocalDate.parse(date);
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            Diary diary = new Diary();
            diary.setTitle(diaryRequestDTO.getTitle());
            diary.setContent(diaryRequestDTO.getContent());
            diary.setDate(diaryDate);
            diary.setUser(user.get());

            Diary savedDiary = diaryRepository.save(diary);
            return convertToResponseDTO(savedDiary);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public DiaryResponseDTO getDiaryByUserAndDate(Long userId, String date) {
        LocalDate diaryDate = LocalDate.parse(date);
        Optional<Diary> diary = diaryRepository.findByUserIdAndDate(userId, diaryDate);
        return diary.map(this::convertToResponseDTO).orElse(null);
    }

    public DiaryResponseDTO updateDiaryByUserAndDate(Long userId, String date, DiaryRequestDTO diaryRequestDTO) {
        LocalDate diaryDate = LocalDate.parse(date);
        Optional<Diary> existingDiary = diaryRepository.findByUserIdAndDate(userId, diaryDate);

        if (existingDiary.isPresent()) {
            Diary diary = existingDiary.get();
            diary.setTitle(diaryRequestDTO.getTitle());
            diary.setContent(diaryRequestDTO.getContent());

            Diary updatedDiary = diaryRepository.save(diary);
            return convertToResponseDTO(updatedDiary);
        } else {
            return null;
        }
    }

    public boolean deleteDiaryByUserAndDate(Long userId, String date) {
        LocalDate diaryDate = LocalDate.parse(date);
        Optional<Diary> diary = diaryRepository.findByUserIdAndDate(userId, diaryDate);

        if (diary.isPresent()) {
            diaryRepository.delete(diary.get());
            return true;
        } else {
            return false;
        }
    }

    private DiaryResponseDTO convertToResponseDTO(Diary diary) {
        DiaryResponseDTO dto = new DiaryResponseDTO();
        dto.setId(diary.getId());
        dto.setTitle(diary.getTitle());
        dto.setDate(diary.getDate());
        dto.setContent(diary.getContent());
        return dto;
    }
}