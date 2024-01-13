package dung.Webbansach_backend.dao;

import dung.Webbansach_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path="user")
public interface UserRepository extends JpaRepository<User, Integer> {
}
