let dbPromised = idb.open("bal-balan", 1, function(upgradeDb) {
    let articlesObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    articlesObjectStore.createIndex("post_team", "post_team", { unique: false });
  });

  function saveForLater(article) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        console.log(article);
        store.put(article);
        return tx.complete;
      })
      .then(function() {
        console.log("Team berhasil di simpan.");
      });
  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("teams", "readonly");
          let store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(articles) {
          resolve(articles);
        });
    });
  }

  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("teams", "readonly");
          let store = tx.objectStore("teams");
          return store.get(id);
        })
        .then(function(article) {
          resolve(article);
        });
    });
  }
  

  function deleteFavorite(id) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        console.log(id);
        store.delete(id);
        return tx.complete;
      })
      .then(function() {
        console.log("Team berhasil di hapus.");
      });
  }