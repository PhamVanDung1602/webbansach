package dung.Webbansach_backend.dao;

import dung.Webbansach_backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="review")
public interface RatingRepository extends JpaRepository<Review, Integer> {
}
