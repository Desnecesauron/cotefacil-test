package br.com.desnecesauron.cotefaciljavatest;

import br.com.desnecesauron.cotefaciljavatest.services.SwService;
import jakarta.annotation.PostConstruct;
import lombok.extern.java.Log;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.UUID;

@Log
@SpringBootApplication
public class CotefacilJavaTestApplication {

    private final SwService swService;

    public CotefacilJavaTestApplication(SwService swService) {
        this.swService = swService;
    }

    public static void main(String[] args) {
        SpringApplication.run(CotefacilJavaTestApplication.class, args);
    }

    @PostConstruct
    public void init() {
        log.info(String.valueOf(UUID.randomUUID()));
        log.info("Initializing project");
        log.info("Count service: " + swService.getCount());
        if (swService.getCount() == 0) {
            log.info("Mocking default data");
            swService.saveFirstData();
        }
    }
}
