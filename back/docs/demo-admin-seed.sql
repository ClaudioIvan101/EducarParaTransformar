with new_user as (
  insert into application_user (
    email,
    first_name,
    last_name,
    password,
    estado_solicitud
  )
  values (
    'director@educar.com',
    'Director',
    'Demo',
    '$2a$10$i3Wue4hBBp5A24kOfByk9elrO4KP1nbv.zpXfHF9zepmKr6dZxlEm',
    'APPROVED'
  )
  returning id
)
insert into user_roles (user_id, roles)
select id, 'ADMIN' from new_user;
