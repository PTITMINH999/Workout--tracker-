package com.minh999.workout_tracker.service;


import com.minh999.workout_tracker.dto.response.DailyWorkoutStatsResponse;
import com.minh999.workout_tracker.dto.response.FavoriteExerciseResponse;
import com.minh999.workout_tracker.dto.response.WorkoutStatsResponse;
import com.minh999.workout_tracker.entity.User;
import com.minh999.workout_tracker.entity.Workout;
import com.minh999.workout_tracker.exception.AppException;
import com.minh999.workout_tracker.exception.ErrorCode;
import com.minh999.workout_tracker.repository.UserRepository;
import com.minh999.workout_tracker.repository.WorkoutExerciseRepository;
import com.minh999.workout_tracker.repository.WorkoutRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class StatsService {
    WorkoutRepository workoutRepository;
    UserRepository userRepository;
    WorkoutExerciseRepository workoutExerciseRepository;

    public WorkoutStatsResponse getMonthlyWorkoutStats(Long userId, int year, int month) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        LocalDateTime startDate = LocalDate.of(year, month, 1).atStartOfDay();
        LocalDateTime endDate = startDate.plusMonths(1).minusNanos(1);

        Object resultObj = workoutRepository.findStatsBetweenDate(userId, startDate, endDate);
        Object[] result = (Object[]) resultObj;
        long totalWorkouts = ((Number) result[0]).longValue();
        double totalCalories = ((Number) result[1]).doubleValue();

        return WorkoutStatsResponse.builder()
                .userId(userId)
                .year(year)
                .month(month)
                .totalWorkouts(totalWorkouts)
                .totalCalories(totalCalories)
                .build();
    }

    public List<FavoriteExerciseResponse> getFavoriteExercises(Long userId, int limit) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        List<Object[]> result = workoutExerciseRepository.findTopExercisesByUser(user);

        return result.stream()
                .limit(limit)
                .map(obj -> FavoriteExerciseResponse.builder()
                        .exerciseId((Long) obj[0])
                        .exerciseName((String) obj[1])
                        .timesUsed((Long) obj[2])
                        .build())
                .toList();
    }

    public WorkoutStatsResponse getWeeklyWorkoutStats(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        LocalDateTime endOfWeek = LocalDateTime.now();
        LocalDateTime startOfWeek = endOfWeek.minusDays(7);

        Object resultObj = workoutRepository.findStatsBetweenDate(userId, startOfWeek, endOfWeek);
        Object[] result = (Object[]) resultObj;
        long totalWorkouts = ((Number) result[0]).longValue();
        double totalCalories = ((Number) result[1]).doubleValue();

        return WorkoutStatsResponse.builder()
                .userId(userId)
                .totalWorkouts(totalWorkouts)
                .totalCalories(totalCalories)
                .build();
    }

    public List<DailyWorkoutStatsResponse> getWeeklyDailyStats(Long userId){
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);
        LocalDate endOfWeek = today.with(DayOfWeek.SUNDAY);

        List<Workout> workouts = workoutRepository
                .findAllByUserIdAndDateBetween(userId, startOfWeek.atStartOfDay(),
                        endOfWeek.plusDays(1).atStartOfDay().minusNanos(1));

        Map<DayOfWeek, List<Workout>> grouped = workouts.stream()
                .collect(Collectors.groupingBy(w -> w.getDate().getDayOfWeek()));

        List<DailyWorkoutStatsResponse> result = new ArrayList<>();
        for (DayOfWeek day : DayOfWeek.values()) {
            List<Workout> list = grouped.getOrDefault(day, Collections.emptyList());
            int totalWorkouts = list.size();
            double totalCalories = 0;
            for (Workout w : list) {
                double c = w.getWorkoutExercises().stream()
                        .mapToDouble(we -> we.getExercise().getCaloriesBurned() * we.getReps() * we.getSets())
                        .sum();
                totalCalories += c;
            }
            result.add(DailyWorkoutStatsResponse.builder()
                    .day(day.name().substring(0, 3)) // MON -> "Mon"
                    .workouts(totalWorkouts)
                    .calories(totalCalories)
                    .build());
        }
        return result;
    }
}
