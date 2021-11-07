package com.habito.platform.service;

import com.habito.platform.domain.Habit;
import com.habito.platform.domain.User;
import com.habito.platform.exception.NotFoundException;
import com.habito.platform.repository.HabitRepository;
import com.habito.platform.security.SecurityUtils;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class HabitService {

    private final HabitRepository habitRepository;

    public Optional<Habit> findById(Long id) {
        var userId = SecurityUtils.getCurrentUserIdWhenAuthorized();
        return habitRepository.findByIdAndUserId(id, userId);
    }

    public Optional<Habit> findByCheckId(Long checkId) {
        var userId = SecurityUtils.getCurrentUserIdWhenAuthorized();
        return habitRepository.findByCheckIdAndUserId(checkId, userId);
    }

    public List<Habit> findAll() {
        var userId = SecurityUtils.getCurrentUserIdWhenAuthorized();
        return habitRepository.findAllByUserId(userId);
    }

    public Habit create(@NonNull Habit habitToSave) {
        // TODO auditorProvider?
        habitToSave.setUser(new User().id(SecurityUtils.getCurrentUserIdWhenAuthorized()));
        return save(habitToSave);
    }

    public Habit save(@NonNull Habit habitToSave) {
        return habitRepository.save(habitToSave);
    }

    public void delete(final long id) {
        Habit habitToDelete = habitRepository.findById(id).orElseThrow(() -> new NotFoundException(Habit.class, id));
        habitRepository.delete(habitToDelete);
    }
}
