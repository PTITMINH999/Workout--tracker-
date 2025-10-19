package com.minh999.workout_tracker.service;

import com.minh999.workout_tracker.dto.request.ProgressRequest;
import com.minh999.workout_tracker.dto.response.ProgressResponse;
import com.minh999.workout_tracker.entity.Progress;
import com.minh999.workout_tracker.entity.User;
import com.minh999.workout_tracker.entity.Workout;
import com.minh999.workout_tracker.exception.AppException;
import com.minh999.workout_tracker.exception.ErrorCode;
import com.minh999.workout_tracker.mapper.ProgressMapper;
import com.minh999.workout_tracker.repository.ProgressRepository;
import com.minh999.workout_tracker.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProgressService {
    ProgressRepository progressRepository;
    UserRepository userRepository;
    ProgressMapper progressMapper;

    public ProgressResponse addProgress(ProgressRequest request){
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Progress progress = progressMapper.toProgress(request,user);
        return progressMapper.toProgressResponse(progressRepository.save(progress));
    }

    public List<ProgressResponse> getProgressByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return progressRepository.findByUser(user)
                .stream()
                .map(progressMapper::toProgressResponse)
                .toList();
    }

    public List<ProgressResponse> getProgressByUserAndDateRange(Long userId, LocalDateTime start, LocalDateTime end) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return progressRepository.findByUserAndDateBetween(user, start, end)
                .stream()
                .map(progressMapper::toProgressResponse)
                .toList();
    }

    public void deleteProgress(Long id){
        Progress progress = progressRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PROGRESS_NOT_EXISTED));
        progressRepository.delete(progress);
    }

    public boolean isOwner(Long progressId,Long userId){
        return progressRepository.findById(progressId)
                .map(progress -> progress.getUser().getId().equals(userId))
                .orElse(false);
    }
}
