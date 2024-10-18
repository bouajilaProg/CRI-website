--login
select user_id,password from users where email = "test";

--select all products
select * 
from materiel as m , category as c
where m.category_id = c.category_id;

--search product
select *
from materiel as m , category as c
where m.category_id = c.category_id and m.materiel_name like "%test%" and (materiel_qte > 0 or 0);

--select materiel by id (optional)
select *
from materiel as m , category as c
where m.category_id = c.category_id and m.materiel_id = 1;

--create order
insert into orders (user_id,order_status)
values (1,"current");

--add materiel to order
insert into order_materiel (order_id,materiel_id,qte)
values (1,1,1);

--update order 
update order_materiel
set qte = 2
where order_id = 1 and materiel_id = 1;

--delete materiel from order
delete from order_materiel
where order_id = 1 and materiel_id = 1;

--get current order
select *
from orders
where user_id = 1 and order_status = "current";

--send order
update orders
set order_status = "sent"
set begin_date = "2024-02-02"
set return_date = "2024-02-05"
set reason = "test"
where order_id = 1;

--get all order for a user
select *
from orders
where user_id = 1;

--change order status
update orders
set order_status = "returned"
where order_id = 1;

