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
    @OneToMany(
        cascade = CascadeType.ALL,
        orphanRemoval = true)
    @JoinColumn(name = "habit_id", referencedColumnName = "id", nullable = false)
    private Set<HabitCheck> checks;

    @NotBlank
    @Column(name = "icon", nullable = false)
    private String icon;

    @NotBlank
    @Column(name = "title", nullable = false)
    private String title;

    public void removeCheck(long id) {
        checks.removeIf(check -> check.getId().equals(id));
    }
}
