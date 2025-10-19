package com.minh999.workout_tracker.mapper;

import com.minh999.workout_tracker.dto.request.UserRequest;
import com.minh999.workout_tracker.dto.response.UserResponse;
import com.minh999.workout_tracker.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "id", ignore = true)
    User toUser(UserRequest request);

    UserResponse toUserResponse(User user);
    void updateUser(@MappingTarget User user, UserRequest request);
}
