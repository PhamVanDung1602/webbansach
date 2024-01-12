package dung.Webbansach_backend.dao;

import dung.Webbansach_backend.entity.Order;
import dung.Webbansach_backend.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
}
