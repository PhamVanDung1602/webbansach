package dung.Webbansach_backend.dao;

import dung.Webbansach_backend.entity.Order;
import dung.Webbansach_backend.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path="order")
public interface OrderRepository extends JpaRepository<Order, Integer> {
}
