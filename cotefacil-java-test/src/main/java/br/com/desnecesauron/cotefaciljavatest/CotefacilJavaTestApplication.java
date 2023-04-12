package br.com.desnecesauron.cotefaciljavatest;

import br.com.desnecesauron.cotefaciljavatest.services.SwService;
import jakarta.annotation.PostConstruct;
import lombok.extern.java.Log;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.util.UUID;

@Log
@SpringBootApplication
public class CotefacilJavaTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(CotefacilJavaTestApplication.class, args);
    }

    @Autowired
    private SwService swService;

    @PostConstruct
    public void init() throws JSONException, IOException, InterruptedException {
        log.info(String.valueOf(UUID.randomUUID()));
        log.info("Initializing project");
        log.info("Count service: " + swService.getCount());
        if (swService.getCount() == 0) {
            log.info("Mocking default data");
            swService.saveFirstData();
        }
    }
}
