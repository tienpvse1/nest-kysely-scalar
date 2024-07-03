-- migrate:up
CREATE TABLE public.category (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE public.product (
  id SERIAL PRIMARY KEY,
  name TEXT,
  price numeric,
  category_id int,
  CONSTRAINT category_fk FOREIGN KEY(category_id) REFERENCES category(id)
);
-- migrate:down
DROP TABLE public.product;
DROP TABLE public.category;


