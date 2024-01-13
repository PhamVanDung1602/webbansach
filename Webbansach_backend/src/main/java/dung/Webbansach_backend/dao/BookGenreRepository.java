package dung.Webbansach_backend.dao;

import dung.Webbansach_backend.entity.BookGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path="book-genre")
public interface BookGenreRepository extends JpaRepository<BookGenre, Integer> {
}
