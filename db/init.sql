CREATE TABLE IF NOT EXISTS user_data (
    user_id TEXT PRIMARY KEY,
    options JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_data_options ON user_data USING GIN (options);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_data_modtime
    BEFORE UPDATE ON user_data
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();