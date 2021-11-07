package com.habito.platform.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "habit_check")
public class HabitCheck {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "habit_id", updatable = false)
    private Habit habit;

    @NotNull
    @Column(name = "date", nullable = false)
    LocalDate date;
}
