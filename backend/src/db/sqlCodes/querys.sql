--login
select user_id,password from users where email = 'test';

--select all products V
select *
from materiel as m , category as c
where m.category_id = c.category_name_id;

--search product V
select *
from materiel as m , category as c
where m.category_id = c.category_name_id and m.materiel_name like '%test%' and (materiel_qte > 0 or true);

--select materiel by id (optional) V
select *
from materiel as m , category as c
where m.category_id = c.category_name_id and m.materiel_id = 1;

--create order V
insert into orders (user_id,order_state)
values (1,'current');

--add materiel to order V
insert into order_item (order_id,materiel_id,qte)
values (1,1,1);

--update order V
update order_item
set qte = 2
where order_id = 1 and materiel_id =11;

--delete materiel from order V
delete from order_item
where order_id = 1 and materiel_id = 1;

--get current order V
select *
from orders
where user_id = 1 and order_state = 'current';


--send order V
update orders
set order_state = 'pending',
begin_date = '2024-02-02', 
return_date = '2024-02-05', 
reason = 'test'
where order_id = 1;

--get all order for a user V
select *
from orders
where user_id = 1;

--change order status V
update orders
set order_state = 'returned'
where order_id = 1;

