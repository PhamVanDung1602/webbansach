package dung.Webbansach_backend.dao;

import dung.Webbansach_backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path = "book")
public interface BookRepository extends JpaRepository<Book, Integer> {
}
