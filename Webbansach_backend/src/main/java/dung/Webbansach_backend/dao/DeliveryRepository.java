package dung.Webbansach_backend.dao;

import dung.Webbansach_backend.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path= "delivery")
public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {
}
