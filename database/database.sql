DROP TABLE IF EXISTS winners
CREATE TABLE winners (
    id serial not null PRIMARY KEY,
    nick text not null,
    seconds integer not null
);






