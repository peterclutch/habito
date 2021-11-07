package com.habito.platform.service.mapper;

import com.habito.platform.domain.Habit;
import com.habito.platform.service.dto.HabitSimpleDto;
import com.habito.platform.service.dto.HabitViewDto;
import org.mapstruct.Mapper;

@Mapper(
    componentModel = "spring",
    uses = { HabitCheckMapper.class }
)
public interface HabitMapper extends AbstractEntityMapper<HabitSimpleDto, Habit> {

    HabitViewDto toViewDto(Habit entity);
}
