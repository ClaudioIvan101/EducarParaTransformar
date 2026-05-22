package com.transformarparaeducar.api_tfi.domain.user.infrastructure;

import com.transformarparaeducar.api_tfi.domain.user.core.model.EmailAddress;
import com.transformarparaeducar.api_tfi.domain.user.core.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Optional;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<User> findById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        return jdbcTemplate.query(sql, new UserRowMapper(), id).stream().findFirst();
    }

    public Iterable<User> findAll() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, new UserRowMapper());
    }

    public User save(User user) {
        if (user.getId() == null) {
            String sql = "INSERT INTO users (name, email) VALUES (?, ?, ?)";
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(conn -> {
                PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, user.getFirstName());
                ps.setString(2, user.getLastName());
                ps.setString(3, user.getEmailAddress().toString());
                return ps;
            }, keyHolder);
        } else {
            String sql = "UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?";
            jdbcTemplate.update(sql, user.getFirstName(), user.getLastName(), user.getEmailAddress().toString(), user.getId());
        }
        return user;
    }

    public void deleteById(Long id) {
        jdbcTemplate.update("DELETE FROM users WHERE id = ?", id);
    }

    public Optional<User> findByEmailAddress(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";
        return jdbcTemplate.query(sql, new UserRowMapper(), email).stream().findFirst();
    }

    // Mapper interno
    private static class UserRowMapper implements RowMapper<User> {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User(
                    new EmailAddress(rs.getString("email")),
                    rs.getString("firstName"),
                    rs.getString("lastName"),
                    null // No se mapea la contraseña por seguridad
            );
            return user;
        }
    }
}