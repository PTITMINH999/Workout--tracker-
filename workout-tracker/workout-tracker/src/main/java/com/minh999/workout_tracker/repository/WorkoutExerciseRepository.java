package com.minh999.workout_tracker.repository;

import com.minh999.workout_tracker.entity.Exercise;
import com.minh999.workout_tracker.entity.User;
import com.minh999.workout_tracker.entity.Workout;
import com.minh999.workout_tracker.entity.WorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkoutExerciseRepository extends JpaRepository<WorkoutExercise,Long> {
    List<WorkoutExercise> findByWorkout(Workout workout);

    @Query("""
        SELECT we.exercise.id, we.exercise.name, COUNT(we.exercise.id)
        FROM WorkoutExercise we
        WHERE we.workout.user = :user
        GROUP BY we.exercise.id, we.exercise.name
        ORDER BY COUNT(we.exercise.id) DESC
    """)
    List<Object[]> findTopExercisesByUser(@Param("user") User user);
}
