package br.com.desnecesauron.cotefaciljavatest.services;

import br.com.desnecesauron.cotefaciljavatest.entities.SwData;
import br.com.desnecesauron.cotefaciljavatest.repositories.SwRepository;
import lombok.extern.java.Log;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@Log
@Service
public class SwService {

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

    public List<SwData> getData() throws IOException, JSONException {
        String e_url = "https://swapi.dev/api/planets/?format=json"; //external API with above JSON data
//        RestTemplate rt = new RestTemplate();

        URL url = new URL("https://api.covid19api.com/summary");

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.connect();

        String response = conn.getResponseMessage();
        log.info(response);
//        log.info((String) conn.getContent());


//        String jsonString = ((String) conn.getContent()).formatted();
        JSONObject obj = new JSONObject(conn.getContent());
        //    String pageName = obj.getJSONObject("pageInfo").getString("pageName");
//
        log.info(obj.toString());
        JSONArray arr = obj.getJSONArray("Countries"); // notice that `"posts": [...]`
        log.info(arr.toString());
        for (int i = 0; i < arr.length(); i++) {
            String post_id = arr.getJSONObject(i).getString("Country");
            log.info(post_id);
        }


        //RestTemplate rt = new RestTemplate();

//        Object[] test = rt.getForObject(e_url, );
        //      List<Object> data = Arrays.asList(test);
        //    log.info(data.toString());

//        return data;
//        SwData[] test = rt.getForObject(e_url, SwData[].class);
        //      List<SwData> data = Arrays.asList(test);
        //    data.forEach(swData -> {
        //      log.info(swData.toString());
        //});
        //return data;
        return null;
    }
}
