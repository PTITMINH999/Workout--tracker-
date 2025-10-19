package com.minh999.workout_tracker.repository;

import com.minh999.workout_tracker.entity.Exercise;
import com.minh999.workout_tracker.entity.Progress;
import com.minh999.workout_tracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ProgressRepository extends JpaRepository<Progress,Long> {
    List<Progress> findByUser(User user);
    List<Progress> findByUserAndDateBetween(User user, LocalDateTime start, LocalDateTime end);
}
