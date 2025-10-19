package com.minh999.workout_tracker.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = WeightValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidWeight {
    String message() default "Weight must be greater than 0 and less than 500";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
