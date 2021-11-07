package com.habito.platform.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
@Entity
@Table(name = "habit")
public class Habit {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", updatable = false)
    private User user;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "habit")
    private Set<HabitCheck> habitChecks;

    @NotBlank
    @Column(name = "icon", nullable = false)
    private String icon;

    @NotBlank
    @Column(name = "title", nullable = false)
    private String title;
}
