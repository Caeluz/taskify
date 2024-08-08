## SQL Queries

### Check if the database exists

```sql
SELECT 1 FROM pg_database WHERE datname = 'node_postgres';
```

### Check if the `users` Table Exists

```sql
SELECT * FROM information_schema.tables WHERE table_name = 'users';
```

### Create the `users` Table

```sql
CREATE TABLE public.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE
);
```

### Insert a User

```sql
INSERT INTO users (name, email) VALUES ('test', 'test@gmail.com');
```
