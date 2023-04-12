package br.com.desnecesauron.cotefaciljavatest.services;

import br.com.desnecesauron.cotefaciljavatest.entities.SwData;
import br.com.desnecesauron.cotefaciljavatest.repositories.SwRepository;
import lombok.extern.java.Log;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@Log
@Service
public class SwService {

    @Value("${swapi.startUrl}")
    private String startUrlSWApi;

    @Value("${swapi.endUrl}")
    private String endUrlSWApi;
    final SwRepository swRepository;

    public SwService(SwRepository swRepository) {
        this.swRepository = swRepository;
    }

    public long getCount() {
        return swRepository.count();
    }

    public List<SwData> getAll() {
        return swRepository.findAll();
    }

    public SwData save(SwData swData) {
        return swRepository.save(swData);
    }

    public List<SwData> findByNameContaining(String name) {
        return swRepository.findByNameContaining(name);
    }

    public SwData findById(String id) {
        return swRepository.findById(id).orElse(null);
    }

    public void deleteById(String id) {
        swRepository.deleteById(id);
    }

    public List<SwData> saveFirstData() throws IOException, InterruptedException, JSONException {
        String urlSWApi = startUrlSWApi + "planets/" + endUrlSWApi; //external API with JSON data

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create(urlSWApi)).build();
        HttpResponse response = client.send(request, HttpResponse.BodyHandlers.ofString());
        log.info("Response body -> " + response.body());

        JSONObject obj = new JSONObject(response.body().toString());
        log.info(String.valueOf("Getting first page of API"));
        JSONArray arr = obj.getJSONArray("results");
        for (int i = 0; i < arr.length(); i++) {
            SwData swData = new SwData();
            swData.setName(arr.getJSONObject(i).getString("name"));
            swData.setTerrain(arr.getJSONObject(i).getString("terrain"));
            swData.setClimate(arr.getJSONObject(i).getString("climate"));
            swData.setQuantityShowedFilms(arr.getJSONObject(i).getJSONArray("films").length());
            log.info(swData.toString());
            swRepository.save(swData);
        }

        return null;
    }
}
