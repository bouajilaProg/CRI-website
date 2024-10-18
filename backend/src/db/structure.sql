-- Step 1: Define the ENUM types
CREATE TYPE user_status AS ENUM ('member', 'rt', 'admin');
CREATE TYPE rt_status AS ENUM ('normal', 'bad', 'news');
CREATE TYPE order_state AS ENUM ('current', 'pending', 'accepted', 'delivered', 'refused', 'returned');

-- User Table
CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    status user_status,
    rt_status rt_status -- rt_status IS 'normal is normal, bad has problem with rt, news has one of his orders answered'
);

-- Category Table
CREATE TABLE category (
    category_name_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_name VARCHAR(50)
);

-- Material Table
CREATE TABLE material (
    material_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    materiel_name VARCHAR(50),
    materiel_qte INT CHECK (materiel_qte >= 0),
    description VARCHAR(400),
    image_link VARCHAR(100),
    category_id INT REFERENCES category(category_name_id)
);

-- Order Table
CREATE TABLE orders (
    order_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    begin_date DATE,
    return_date DATE,
    reason VARCHAR(255),
    order_state order_state
);

-- Order Item Table
CREATE TABLE order_item (
    order_id INT REFERENCES orders(order_id),
    material_id INT REFERENCES material(material_id),
    qte INT,
    PRIMARY KEY (order_id, material_id)
);
