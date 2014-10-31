(function(){
  interaction = {
    mouseover: function(d) {
      svg.selectAll("path.link.target-" + d.key)
        .classed("target", true)
        .each(interaction.updateNodes("source", true));
      svg.selectAll("path.link.source-" + d.key)
        .classed("source", true)
        .each(interaction.updateNodes("target", true));
    },

    mouseout: function(d) {
      svg.selectAll("path.link.source-" + d.key)
        .classed("source", false)
        .each(interaction.updateNodes("target", false));

      svg.selectAll("path.link.target-" + d.key)
        .classed("target", false)
        .each(interaction.updateNodes("source", false));
    },

    updateNodes: function(name, value) {
      return function(d) {
        if (value) this.parentNode.appendChild(this);
        svg.select("#node-" + d[name].key).classed(name, value);
      };
    }
	};
})();