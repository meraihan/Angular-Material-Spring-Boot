package com.xscavia.backend.repository;

import com.xscavia.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.verificationCode = ?1 ")
    User findByVerificationCode(String verificationCode);

    @Query(" update User u set u.isEnabled = 1 where u.id=?1 ")
    @Modifying
    Integer enable(Long id);

    @Query("SELECT u.isEnabled FROM User u WHERE u.username = ?1 ")
    Integer userIsEnable(String username);
}
