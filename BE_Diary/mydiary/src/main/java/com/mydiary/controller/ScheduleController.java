package com.mydiary.controller;

import com.mydiary.dto.ScheduleRequestDTO;
import com.mydiary.dto.ScheduleResponseDTO;
import com.mydiary.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<ScheduleResponseDTO> createSchedule(@RequestBody ScheduleRequestDTO scheduleRequestDTO) {
        ScheduleResponseDTO createdSchedule = scheduleService.createSchedule(scheduleRequestDTO);
        return ResponseEntity.ok(createdSchedule);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleResponseDTO> getScheduleById(@PathVariable Long id) {
        ScheduleResponseDTO schedule = scheduleService.getScheduleById(id);
        return schedule != null ? ResponseEntity.ok(schedule) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<ScheduleResponseDTO>> getAllSchedules() {
        List<ScheduleResponseDTO> schedules = scheduleService.getAllSchedules();
        return ResponseEntity.ok(schedules);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScheduleResponseDTO> updateSchedule(@PathVariable Long id, @RequestBody ScheduleRequestDTO scheduleRequestDTO) {
        ScheduleResponseDTO updatedSchedule = scheduleService.updateSchedule(id, scheduleRequestDTO);
        return updatedSchedule != null ? ResponseEntity.ok(updatedSchedule) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }
}