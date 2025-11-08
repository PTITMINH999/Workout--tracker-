package com.minh999.workout_tracker.mapper;

import com.minh999.workout_tracker.dto.request.WorkoutRequest;
import com.minh999.workout_tracker.dto.response.WorkoutResponse;
import com.minh999.workout_tracker.entity.User;
import com.minh999.workout_tracker.entity.Workout;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface WorkoutMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "workoutExercises", ignore = true)
    @Mapping(target = "status", ignore = true)
    Workout toWorkout(WorkoutRequest request, User user);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "username", source = "user.username")
    WorkoutResponse toWorkoutResponse(Workout workout);

    @Mapping(target = "status", ignore = true)
    void updateWorkout(@MappingTarget Workout workout, WorkoutRequest request);
}
