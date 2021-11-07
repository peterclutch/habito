package com.habito.platform.web.rest;

import com.habito.platform.domain.Habit;
import com.habito.platform.service.HabitService;
import com.habito.platform.service.dto.HabitCheckDto;
import com.habito.platform.service.dto.HabitViewDto;
import com.habito.platform.service.mapper.HabitCheckMapper;
import com.habito.platform.service.mapper.HabitMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class HabitCheckResource {

    private final HabitCheckMapper habitCheckMapper;

    private final HabitMapper habitMapper;

    private final HabitService habitService;

    @PostMapping("/habits/check")
    public ResponseEntity<HabitViewDto> create(@Valid @RequestBody HabitCheckDto dto) throws URISyntaxException {
        Habit habit = habitService.findById(dto.getHabitId()).orElseThrow(RuntimeException::new);
        habit.getChecks().add(habitCheckMapper.toEntity(dto));
        habit = habitService.save(habit);

        return ResponseEntity
            .created(new URI(String.format("/api/habits/%s/check", habit.getId())))
            .body(habitMapper.toViewDto(habit));
    }

    @DeleteMapping("/habits/check/{id}")
    public ResponseEntity<HabitViewDto> delete(@PathVariable Long id) {
        Habit habit = habitService.findByCheckId(id).orElseThrow(RuntimeException::new);
        habit.removeCheck(id);
        habit = habitService.save(habit);

        return ResponseEntity.ok().body(habitMapper.toViewDto(habit));
    }
}
