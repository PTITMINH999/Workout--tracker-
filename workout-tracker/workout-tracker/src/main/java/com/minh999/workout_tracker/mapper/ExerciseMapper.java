package com.minh999.workout_tracker.mapper;

import com.minh999.workout_tracker.dto.request.ExerciseRequest;
import com.minh999.workout_tracker.dto.response.ExerciseResponse;
import com.minh999.workout_tracker.entity.Exercise;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ExerciseMapper {
    @Mapping(target = "id", ignore = true)
    Exercise toExercise(ExerciseRequest request);

    ExerciseResponse toExerciseResponse(Exercise exercise);

    void updateExercise(@MappingTarget Exercise exercise, ExerciseRequest request);
}
