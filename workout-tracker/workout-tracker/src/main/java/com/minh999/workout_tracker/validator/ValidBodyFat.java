package com.minh999.workout_tracker.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = BodyFatValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidBodyFat {
    String message() default "BodyFat must be at least 1.0 and less than 70.0";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
