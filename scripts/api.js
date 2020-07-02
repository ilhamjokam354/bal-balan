const base_uri = "https://api.football-data.org/v2";
const api_key = "009ddaca7fb04c8195d2599b2ae971a6"
const getTeam = ()=>{
        if ('caches' in window) {
            caches.match(`${base_uri}/teams`).then(function(response) {
            if (response) {
                let articlesTeam = "";
                response.json().then(function (data) {
                    console.log(data)
                    data.teams.forEach(function(team) {
                    articlesTeam += `
                    <div class="card">
                        <div class="card-image">
                            <img src="${team.crestUrl ? team.crestUrl : "./images/404.jpg"}" height="200px" alt="Logo ${team.name}" width="300px">
                        
                        </div>
                        <div class="card-content">
                            <h4 ><b><span >${team.name}</span></b></h4>
                            <p>${team.address}</p>
                        </div>
                        <div class="card-action">
                            <a href="./detailteam.html?id=${team.id}" class="waves-effect waves-light btn blue">Detail</a>
                        </div>
                    </div>
                        `;
                });
                
                // Sisipkan komponen card ke dalam elemen dengan id #team
                const team = document.querySelector("#team")
                team.innerHTML = articlesTeam; 
                })
            }
            })
        }
        fetch(`${base_uri}/teams`, {
            method : "GET",
            headers : {
                "X-Auth-Token" : api_key
            }
        })
        .then(response => {
            return response.json()
        })
        .then(responseWithJson => {
            let articlesTeam = "";
                responseWithJson.teams.forEach(function(team) {
                    articlesTeam += `
                    <div class="card">
                        <div class="card-image">
                            <img  src="${team.crestUrl ? team.crestUrl : "./images/404.jpg"}" alt="Logo ${team.name}" height="200px" width="300px">
                        
                        </div>
                        <div class="card-content">
                            <h4 ><b><span >${team.name}</span></b></h4>
                            <p>${team.address}</p>
                        </div>
                        <div class="card-action">
                            <a href="./detailteam.html?id=${team.id}" class="waves-effect waves-light btn blue">Detail</a>
                        </div>
                    </div>
                        `;
                    }); 
                   
                    // Sisipkan komponen card ke dalam elemen dengan id #team
                const team = document.querySelector("#team")
                team.innerHTML = articlesTeam;
        })       
  }



const getCompetitions = ()=>{
        if ('caches' in window) {
            caches.match(`${base_uri}/competitions/2021`).then(function(response) {
            if (response) {
                let articlesCompetitions = "";
                response.json().then(function (data) {
                    console.log(data)
                    const namaLiga = document.getElementById("namaLiga");
                    const lastUpdate = document.getElementById("lastUpdate");
                    namaLiga.innerHTML = data.name;
                    
                    data.seasons.forEach(function(competition) {
                    articlesCompetitions += `
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4">${data.name}<i class="material-icons right">remove_red_eye</i></span>
                            <p>Tanggal Main ${competition.startDate} Sampai ${competition.endDate}</p>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i>${data.name}</span>
                            <p class="text-center">${daftarPemenang(competition.winner)}</p>
                        </div>
                    </div>
                `;

                });
                
                // Sisipkan komponen card ke dalam elemen dengan id #pertandingan
                const team = document.querySelector("#pertandingan")
                team.innerHTML = articlesCompetitions;
                lastUpdate.innerHTML = data.lastUpdated

                })
            }
            })
        }
        fetch(`${base_uri}/competitions/2021`, {
            method : "GET",
            headers : {
                "X-Auth-Token" : api_key
            }
        })
        .then(response => {
            return response.json()
        })
        .then(responseWithJson => {
            let articlesCompetitions = "";
            // console.log(responseWithJson)
            const namaLiga = document.getElementById("namaLiga");
            const lastUpdate = document.getElementById("lastUpdate");
            namaLiga.innerHTML = responseWithJson.name;
            responseWithJson.seasons.forEach(function(competition) {
                articlesCompetitions += `
                <div class="card">
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${responseWithJson.name}<i class="material-icons right">remove_red_eye</i></span>
                        <p>Tanggal Main ${competition.startDate} Sampai ${competition.endDate}</p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i>${responseWithJson.name}</span>
                        <p class="text-center">${daftarPemenang(competition.winner)}</p>
                    </div>
                </div>
                `;
            });
            
            // Sisipkan komponen card ke dalam elemen dengan id #pertandingan
            const team = document.querySelector("#pertandingan")
            team.innerHTML = articlesCompetitions;
            const date = new Date();
            lastUpdate.innerHTML = date.toUTCString(responseWithJson.lastUpdated)

        })       
  }
const daftarPemenang = (data)=>{
    if(data === null){
        return `<p style="color:red;">Upss... Tidak Ada Data</p>`;
    }else{
        return `
            <img src="${data.crestUrl} " height='200px'><br>
            Pemenang : ${data.name}
        `
    }
}  


const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': api_key
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

function getAllStandings() {
    if ("caches" in window) {
        caches.match(`${base_uri}/competitions/2021/standings`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(`${base_uri}/competitions/2021/standings`)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    let standings = "";
    let standingElement =  document.getElementById("bodyTable");

    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td>${standing.position}</td>
                    <td><img src="${standing.team.crestUrl}" alt="${standing.team.name}" height="30px" alt="badge"/></td>
                    <td>${standing.playedGames}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                    <td>${standing.points}</td>
                </tr>
        `;
    });

     standingElement.innerHTML = `
     <table class="highlight responsive-table"> 
        <thead>
            <tr>
                <th>Position</th>
                <th>Logo</th>
                <th>PG</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Point</th>
            </tr>
        </thead>
        <tbody id="bodyTable">
            ${standings}
        </tbody>
    </table>
    `;
    document.getElementById("progress").style.display = "none";
}
  function getIdDetailTeam() {
    return new Promise(function(resolve, reject) {
      // Ambil nilai query parameter (?id=)
      let urlParams = new URLSearchParams(window.location.search);
      let idParam = urlParams.get("id");
      if ("caches" in window) {
        caches.match(`${base_uri}/teams/${idParam}`).then(function(response) {
          if (response) {
            response.json().then(function(data) {
                // .... kode lain disembunyikan agar lebih ringkas
                let articleHTML = `
                <div class="card">
                    <div class="card-image">
                        <img src="${data.crestUrl ? data.crestUrl : "./images/404.jpg" }" width="200px" height="200px">
                    
                        <button onclick="addToSaved()" class="btn-floating halfway-fab waves-effect waves-light red" id="saved" ><i class="material-icons">favorite</i></button>
                    </div>
                    <div class="card-content">
                        <span class="card-title">${data.name}</span>
                        <table>
                            <tr>
                                <td>Alamat :</td>
                                <td>${data.address ? data.address : "Tidak Ada Data :)"}</td>
                            </tr>
                            <tr>
                                <td>Telepon :</td>
                                <td>${data.phone ? data.phone : "Tidak Ada Data :)"}</td>
                            </tr>
                            <tr>
                                <td>Website :</td>
                                <td><a href="${data.website ? data.website : "Tidak Ada Data :)"}" target="_blank">Website </a></td>
                            </tr>
                            <tr>
                                <td>Stadion :</td>
                                <td>${data.venue ? data.venue : "Tidak Ada Data :)"}</td>
                            </tr>
                            <tr>
                                <td>Club Colors :</td>
                                <td>${data.clubColors }</td>
                            </tr>
                        </table>
                    </div> 
                </div>
                `;
                document.getElementById("detail-content").innerHTML = articleHTML;
            
                resolve(data);
            });
          }
        });
      }
      fetch(`${base_uri}/teams/${idParam}`, {
          method : "GET",
          headers : {
            "X-Auth-Token" : api_key
          }
      })
        .then(response => {return response.json()})
        .then(function(data) {
          // ... kode lain disembunyikan agar lebih ringkas 
          let articleHTML = `
            <div class="card">
                <div class="card-image">
                    <img src="${data.crestUrl ? data.crestUrl : "./images/404.jpg"}" width="200px" height="200px">
              
                    <button onclick="addToSaved(${data.id})"  class="btn-floating halfway-fab waves-effect waves-light red" id="saved"><i class="material-icons">favorite</i></button>
                </div>
                <div class="card-content">
                    <span class="card-title">${data.name}</span>
                    <table>
                        <tr>
                            <td>Alamat :</td>
                            <td>${data.address ? data.address : "Tidak Ada Data :)"}</td>
                        </tr>
                        <tr>
                            <td>Telepon :</td>
                            <td>${data.phone ? data.phone : "Tidak Ada Data :)"}</td>
                        </tr>
                        <tr>
                            <td>Website :</td>
                            <td><a href="${data.website ? data.website : "Tidak Ada Data :)"}" target="_blank">Website </a></td>
                        </tr>
                        <tr>
                            <td>Stadion :</td>
                            <td>${data.venue ? data.venue : "Tidak Ada Data :)"}</td>
                        </tr>
                        <tr>
                            <td>Club Colors :</td>
                            <td>${data.clubColors}</td>
                        </tr>
                    </table>
                </div>    
            </div>
           
            `;
          document.getElementById("detail-content").innerHTML = articleHTML;
          
          resolve(data);
        });
    });
   
}


function addToSaved(id){ 
    const tanya = confirm("Simpan Ke Favorit?")
    let item = getIdDetailTeam();
    if(tanya){
        item.then(function(teams) {
            saveForLater(teams)   
            M.toast({html : `Berhasil Menambah ${teams.name} Ke Favorite`})
        })
    }
}

function getSavedTeam() {
getAll()
    .then(function(articles) {
 
        if(articles == ""){
            document.getElementById("favorite").innerHTML = 
            `
            <h3 class="header text-center">Upss...</h3>
            <br>
            <p class="flow-text text-center" >Anda Belum Mempunyai Favorite</p>
            `
            
        }else{
            // Menyusun komponen card artikel secara dinamis
            let articlesHTML = "";
            articles.forEach(function(teams) {
            articlesHTML += `
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img src="${teams.crestUrl ? teams.crestUrl : "./images/404.jpg"}" height="50px" width="50px" />
                    </div>
                    <div class="card-content">
                        <span class="card-title ">${teams.name}</span>
                        <p>${teams.address}</p>
                    </div>
                    <div class="card-action">
                        <a href="./detailteam.html?id=${teams.id}" class="waves-effect waves-light btn "><i class="material-icons">remove_red_eye</i></a>
                        <button onclick="deleteOnFavorite(${teams.id},'${teams.name}')" class="waves-effect waves-light btn red"><i class="material-icons">clear</i></button>
                    </div>
                </div>
                    `;
                });
                // Sisipkan komponen card ke dalam elemen dengan id #favorite
                document.getElementById("favorite").innerHTML = articlesHTML;
        }
    });
}
          


function deleteOnFavorite(id, name){

const tanya = confirm("Yakin Ingin Menghapus?")
    if(tanya){
        deleteFavorite(id)
        M.toast({html : `Berhasil Menghapus ${name}`})
        getSavedTeam()
        
    }else{
        getSavedTeam()
    }
}