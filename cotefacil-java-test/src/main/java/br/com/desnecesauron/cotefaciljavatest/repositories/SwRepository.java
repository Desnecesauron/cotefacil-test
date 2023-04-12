package br.com.desnecesauron.cotefaciljavatest.repositories;

import br.com.desnecesauron.cotefaciljavatest.entities.SwData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SwRepository extends JpaRepository<SwData, String> {

    public List<SwData> findByNameContaining(String name);
}
