INSERT INTO users(name,email,password) VALUES('Fred Balbone', 'fff@fff.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users(name,email,password) VALUES('Kate Spade', 'kkk@kkk.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users(name,email,password) VALUES('Ron Rondo', 'rrr@rrr.com',  '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users(name,email,password) VALUES('John Smith', 'jjj@jjj,com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users(name,email,password) VALUES('Emily Tred', 'eee@eee.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city,  province, post_code, active) VALUES (1, 'Good Home', 'Awesome', 'https://www.google.com/search?q=great+home&sxsrf=ALeKk02PpWuzHEwIgaB2i5oYc0shZrHh8Q:1597869890679&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjapuyZkajrAhWSK30KHTSABCIQ_AUoAXoECBsQAw&biw=1440&bih=789#imgrc=IspgUmXcHBQ6UM', 'https://www.google.com/search?q=great+home&sxsrf=ALeKk02PpWuzHEwIgaB2i5oYc0shZrHh8Q:1597869890679&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjapuyZkajrAhWSK30KHTSABCIQ_AUoAXoECBsQAw&biw=1440&bih=789#imgrc=IspgUmXcHBQ6UM', '2', '3', '4','Canada', '321-Owe', 'Vancouver','BC', 'D3E3R4', 'true');
INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city,  province, post_code, active) VALUES (1, 'Home sweet home', 'Enjoy staying here', 'http://psce.pw/UM25E', 'http://psce.pw/UM25E', '2', '5', '5','Canada', '234-Harrison Ave.', 'Vancouver','BC', 'H3EVR4', 'true');
INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city,  province, post_code, active) VALUES (2, 'Live here!', 'Ahhh Sweeet', 'http://psce.pw/TVU9Z','http://psce.pw/TVU9Z', '2', '5','3', 'Canada', '333 Street', 'Vancouver', 'BC', 'F4D3S2', 'true');
INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city,  province, post_code, active) VALUES (3, 'Niiice', 'Boom', 'http://psce.pw/V83VP','http://psce.pw/V83VP', '2', '3', '3', 'Canada', '121 Robson', 'Vancouver', 'BC', 'L9G5D3', 'false');

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2018-02-12', '2018-01-12', '4','3');
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2018-10-10', '2018-11-12', '2', '4');
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2019-01-01','2020-01-01', '2', '4');
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2019-05-16', '2019-09-23', '3', '1');

INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message) VALUES('3','4','5','10', 'Awesome!');
INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message) VALUES ('4','2','6','2', 'Bad!');
INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message) VALUES ('3','2','6','8', 'Cool!');
INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message) VALUES ('4','3','5','6', 'Nice!');