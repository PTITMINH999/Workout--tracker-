package com.minh999.workout_tracker.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = CaloriesBurnedValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidCaloriesBurned {
    String message() default "Calories burned must be greater than 0 and cannot exceed 2000";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
