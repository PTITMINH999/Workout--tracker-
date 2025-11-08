package com.minh999.workout_tracker.repository;

import com.minh999.workout_tracker.entity.Exercise;
import com.minh999.workout_tracker.entity.User;
import com.minh999.workout_tracker.entity.Workout;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout,Long> {
    List<Workout> findByUser(User user);

    @Query("SELECT COUNT(w) FROM Workout w " +
            "WHERE w.user = :user " +
            "AND w.date BETWEEN :startDate AND :endDate")
    long countWorkoutsByUserAndMonth(
            @Param("user") User user,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
    Page<Workout> findByDateBetween(LocalDateTime start,LocalDateTime end, Pageable pageable);

    @Query("""
        SELECT 
            COUNT(DISTINCT w.id) AS totalWorkouts,
            COALESCE(SUM(we.sets * we.reps * e.caloriesBurned), 0) AS totalCalories
        FROM Workout w
        LEFT JOIN w.workoutExercises we
        LEFT JOIN we.exercise e
        WHERE w.user.id = :userId
          AND w.date >= :start
          AND w.date < :end
    """)
    Object findStatsBetweenDate(@Param("userId") Long userId,
                             @Param("start") LocalDateTime start,
                             @Param("end") LocalDateTime end);

    List<Workout> findAllByUserIdAndDateBetween(
            Long userId,
            LocalDateTime startDate,
            LocalDateTime endDate
    );
}
