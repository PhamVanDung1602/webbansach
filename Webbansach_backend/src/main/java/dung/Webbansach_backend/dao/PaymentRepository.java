package dung.Webbansach_backend.dao;

import dung.Webbansach_backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path = "payment")
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
