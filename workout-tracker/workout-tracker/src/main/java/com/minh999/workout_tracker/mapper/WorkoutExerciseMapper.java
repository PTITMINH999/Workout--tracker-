package com.minh999.workout_tracker.mapper;

import com.minh999.workout_tracker.dto.request.WorkoutExerciseRequest;
import com.minh999.workout_tracker.dto.response.WorkoutExerciseResponse;
import com.minh999.workout_tracker.entity.Exercise;
import com.minh999.workout_tracker.entity.Workout;
import com.minh999.workout_tracker.entity.WorkoutExercise;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WorkoutExerciseMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "workout", source = "workout")
    @Mapping(target = "exercise", source = "exercise")
    WorkoutExercise toWorkoutExercise(WorkoutExerciseRequest request, Workout workout, Exercise exercise);

    @Mapping(target = "workoutId", source = "workout.id")
    @Mapping(target = "exerciseId", source = "exercise.id")
    @Mapping(target = "exerciseName", source = "exercise.name")
    WorkoutExerciseResponse toWorkoutExerciseResponse(WorkoutExercise workoutExercise);
}
