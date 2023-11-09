-- Create the table for Questions
CREATE TABLE Question (
    id INT AUTO_INCREMENT,
    question_text TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- Create the table for Answers
CREATE TABLE Answer (
    id INT AUTO_INCREMENT,
    question_id INT NOT NULL,
    answer_text TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES Question(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create an index on question_id in the Answer table for faster lookups
CREATE INDEX idx_question_id ON Answer (question_id);

-- Create an index on created_at in both tables for optimized date-based queries
CREATE INDEX idx_created_at_question ON Question (created_at);
CREATE INDEX idx_created_at_answer ON Answer (created_at);