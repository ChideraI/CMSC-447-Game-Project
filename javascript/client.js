


class Client {
    constructor(url, data){
        this.url = url || "https://eope3o6d7z7e2cc.m.pipedream.net";
        this.datasource = data
    }

    async post(endpoint, body) {
        const url = `${this.url}${endpoint}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    }


    async connect(db){

        //this function will work by connecting to the backend db to pull information
        //backend db managed server side
        
    }



    

    
}