package com.minh999.workout_tracker.repository;

import com.minh999.workout_tracker.entity.Exercise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise,Long> {
    boolean existsByName(String name);
    Page<Exercise> findByCategoryIgnoreCase(String category, Pageable pageable);
    Page<Exercise> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
