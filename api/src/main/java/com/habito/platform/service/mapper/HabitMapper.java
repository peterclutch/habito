package com.habito.platform.service.mapper;

import com.habito.platform.domain.Habit;
import com.habito.platform.domain.HabitCheck;
import com.habito.platform.service.dto.HabitSimpleDto;
import com.habito.platform.service.dto.HabitViewDto;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface HabitMapper extends AbstractEntityMapper<HabitSimpleDto, Habit> {

    HabitViewDto toViewDto(Habit entity);

    @AfterMapping
    default void setChecks(@MappingTarget HabitViewDto dto, Habit entity) {
        dto.setChecks(entity
            .getHabitChecks()
            .stream()
            .map(HabitCheck::getDate)
            .collect(Collectors.toSet()));
    }
}
