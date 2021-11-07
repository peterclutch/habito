package com.habito.platform.service.mapper;

import com.habito.platform.domain.HabitCheck;
import com.habito.platform.service.dto.HabitCheckDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HabitCheckMapper extends AbstractEntityMapper<HabitCheckDto, HabitCheck> {
}
