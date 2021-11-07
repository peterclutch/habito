package com.habito.platform.service.mapper;

import com.habito.platform.domain.Habit;
import com.habito.platform.domain.HabitCheck;
import com.habito.platform.service.dto.HabitSimpleDto;
import com.habito.platform.service.dto.HabitViewDto;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface HabitMapper extends AbstractEntityMapper<HabitSimpleDto, Habit> {

    @Mapping(target = "checks", ignore = true)
    HabitViewDto toViewDto(Habit entity);

    @AfterMapping
    default void setChecks(@MappingTarget HabitViewDto dto, Habit entity) {
        dto.setChecks(entity
            .getChecks()
            .stream()
            .map(HabitCheck::getDate)
            .collect(Collectors.toSet()));
    }
}
