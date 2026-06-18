CREATE OR REPLACE FUNCTION match_transactions (
    query_embedding vector(768),
    match_treshold float,
    match_count int
)

RETURNS TABLE (
    id uuid,
    type text,
    amount numeric,
    category text,
    description text,
    date date,
    user_id uuid,
    similarity float
)

LANGUAGE sql STABLE
AS $$
    SELECT
        transactions.id,
        transactions.type,
        transactions.amount,
        transactions.category,
        transactions.description,
        transactions.date,
        transactions.user_id,
        1 - (transactions.embedding <=> query_embedding) AS similarity
    FROM transactions
    WHERE 1 - (transactions.embedding <=> query_embedding) > match_treshold
    ORDER BY transactions.embedding <=> query_embedding
    LIMIT match_count;
$$;