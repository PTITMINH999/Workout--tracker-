-- =========================
-- 1️⃣ Bảng exercises
-- =========================
CREATE TABLE exercises (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    category VARCHAR(255),
    description VARCHAR(255),
    calories_burned FLOAT(53),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- =========================
-- 2️⃣ Bảng users
-- =========================
CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- =========================
-- 3️⃣ Bảng roles
-- =========================
CREATE TABLE roles (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- =========================
-- 4️⃣ Bảng user_roles (N-N giữa users và roles)
-- =========================
CREATE TABLE user_roles (
    role_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (role_id, user_id)
) ENGINE=InnoDB;

ALTER TABLE user_roles
    ADD CONSTRAINT fk_user_roles_role
    FOREIGN KEY (role_id)
    REFERENCES roles (id);

ALTER TABLE user_roles
    ADD CONSTRAINT fk_user_roles_user
    FOREIGN KEY (user_id)
    REFERENCES users (id);

-- =========================
-- 5️⃣ Bảng workouts
-- =========================
CREATE TABLE workouts (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT,
    date DATETIME(6),
    notes VARCHAR(255),
    status ENUM('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    PRIMARY KEY (id)
) ENGINE=InnoDB;

ALTER TABLE workouts
    ADD CONSTRAINT fk_workouts_user
    FOREIGN KEY (user_id)
    REFERENCES users (id);

-- =========================
-- 6️⃣ Bảng workout_exercises (N-N giữa workouts và exercises)
-- =========================
CREATE TABLE workout_exercises (
    id BIGINT NOT NULL AUTO_INCREMENT,
    workout_id BIGINT,
    exercise_id BIGINT,
    sets INT,
    reps INT,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

ALTER TABLE workout_exercises
    ADD CONSTRAINT fk_workout_exercises_workout
    FOREIGN KEY (workout_id)
    REFERENCES workouts (id);

ALTER TABLE workout_exercises
    ADD CONSTRAINT fk_workout_exercises_exercise
    FOREIGN KEY (exercise_id)
    REFERENCES exercises (id);

-- =========================
-- 7️⃣ Bảng progress (theo dõi tiến độ người dùng)
-- =========================
CREATE TABLE progress (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT,
    date DATETIME(6),
    weight FLOAT(53),
    body_fat FLOAT(53),
    notes VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

ALTER TABLE progress
    ADD CONSTRAINT fk_progress_user
    FOREIGN KEY (user_id)
    REFERENCES users (id);

-- =========================
-- 8️⃣ Bảng refresh_tokens
-- =========================
CREATE TABLE refresh_tokens (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expiry_date DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_refresh_tokens_token UNIQUE (token)
) ENGINE=InnoDB;

ALTER TABLE refresh_tokens
    ADD CONSTRAINT fk_refresh_tokens_user
    FOREIGN KEY (user_id)
    REFERENCES users (id);
