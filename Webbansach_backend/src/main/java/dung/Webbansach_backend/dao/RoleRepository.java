package dung.Webbansach_backend.dao;

import dung.Webbansach_backend.entity.Role;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path="role")
public interface RoleRepository extends JpaRepository<Role, Integer> {
}
