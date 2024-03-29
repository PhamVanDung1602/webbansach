package dung.Webbansach_backend.dao;

import dung.Webbansach_backend.entity.FavoriteBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path="favorite-book")
public interface FavoriteBookRepository extends JpaRepository<FavoriteBook, Integer> {
}
