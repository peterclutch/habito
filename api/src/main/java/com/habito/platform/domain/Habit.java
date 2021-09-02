package com.habito.platform.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@Entity
@Table(name = "habit")
public class Habit implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JoinColumn(updatable = false, name = "user_id")
    private User user;

    @NotBlank
    @Column(name = "icon", nullable = false)
    private String icon;

    @NotBlank
    @Column(name = "title", nullable = false)
    private String title;
}
