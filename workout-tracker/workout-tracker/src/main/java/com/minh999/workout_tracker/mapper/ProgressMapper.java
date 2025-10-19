package com.minh999.workout_tracker.mapper;

import com.minh999.workout_tracker.dto.request.ProgressRequest;
import com.minh999.workout_tracker.dto.response.ProgressResponse;
import com.minh999.workout_tracker.entity.Progress;
import com.minh999.workout_tracker.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
@Mapper(componentModel = "spring")
public interface ProgressMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "user")
    Progress toProgress(ProgressRequest request, User user);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "username", source = "user.username")
    ProgressResponse toProgressResponse(Progress progress);
}
