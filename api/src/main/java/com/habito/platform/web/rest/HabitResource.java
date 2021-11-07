package com.habito.platform.web.rest;

import com.habito.platform.domain.Habit;
import com.habito.platform.service.HabitService;
import com.habito.platform.service.dto.HabitSimpleDto;
import com.habito.platform.service.dto.HabitViewDto;
import com.habito.platform.service.mapper.HabitMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class HabitResource {

    private final HabitService habitService;

    private final HabitMapper habitMapper;

    @GetMapping("/habits")
    public ResponseEntity<List<HabitSimpleDto>> getAll() {
        var result = habitMapper.toDto(habitService.findAll());
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/habits/{id}")
    public ResponseEntity<HabitViewDto> getOne(@PathVariable Long id) {
        var result = habitService.findById(id).map(habitMapper::toViewDto);
        return result.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/habits")
    public ResponseEntity<HabitSimpleDto> create(@Valid @RequestBody HabitSimpleDto dto) throws URISyntaxException {
        Habit savedEntity = habitService.create(habitMapper.toEntity(dto));

        return ResponseEntity
            .created(new URI("/api/habits/" + savedEntity.getId()))
            .body(habitMapper.toDto(savedEntity));
    }

    @DeleteMapping("/habits/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        habitService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
