(function() {
  artists_similarity = {

    // Construct the nodes for each artist
    root: function(artists) {
      var map = {};

      function find(name, data) {
        var node = map[name];
        if (!node) {
          node = map[name] = data || {name: name, children: []};
          if (name.length) {
            node.parent = find(""); //ToDo(nigini): Let's keep it to make this work for now
            node.parent.children.push(node);
            node.key = name.replace(/ /g, "_");
          }
        }
        return node;
      }

      artists.forEach(function(d) {
        find(d.nome, d);
      });

      return map[""];
    },

    // Return a list of similar artist for the given array of artists.
    similar: function(artists) {
      var map = {},
          similars = [];

      // Compute a map from name to node.
      artists.forEach(function(d) {
        map[d.nome] = d;
      });

      // For each artist, construct a link from he/she to similar ones.
      artists.forEach(function(artist) {
        if (artist.similaridade) artist.similaridade.forEach(function(similar_artist) {
          similars.push({source: artist, target: map[similar_artist.nome]});
        });
      });
      return similars;
    }

  };
})();
