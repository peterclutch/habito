package com.habito.platform.service.mapper;

import com.habito.platform.domain.Habit;
import com.habito.platform.service.dto.HabitDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HabitMapper extends AbstractEntityMapper<HabitDto, Habit> {

}
