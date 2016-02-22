var Resources = {
        _autoload : [ { name: 'scenarios', loader: removeHidden }, { name: 'names', loader: toDict } ]
      };

function toDict(d) { return new Dictionary(d); }

function removeHidden(d) {
  d.scenarios = d.scenarios.filter(function (s) {
    return !s.hidden;
  });
  return d;
}

function getBehaviorsFor(profile) {
    var targets = Resources.scenarios.targets,
        scenarios  = Resources.scenarios.scenarios,
        _profile   = new Profile(profile);
    return matchingScenarios(targets, scenarios, _profile).map(function (scenarioMatching) {
      var scenarioInfo = getScenarioInfo('scenarios', scenarioMatching.scenario);
      return {
        name : scenarioInfo.verb,
        score : scenarioMatching.score,
        tooltip: renderMarkdown(scenarioInfo.tooltip)
      };
    });
  }

exports.changeProfileLabels = function(data) {
    var clonned = JSON.parse(JSON.stringify(data)),
      replacements = {
        'Extraversion' : 'Introversion/Extraversion',
        'Outgoing' : 'Warmth',
        'Uncompromising': 'Straightforwardness',
        'Immoderation': 'Impulsiveness',
        'Susceptible to stress': 'Sensitivity to stress',
        'Conservation': 'Tradition',
        'Openness to change': 'Stimulation',
        'Hedonism': 'Taking pleasure in life',
        'Self-enhancement': 'Achievement',
        'Self-transcendence': 'Helping others'
      };

    function walkTree(f, tree) {
      f(tree);
      if (tree.children) {
        tree.children.forEach(walkTree.bind(this, f));
      }
    }

    walkTree(function (node) {
      if (node.id && replacements[node.id.replace('_parent', '')]) {
        node.name = replacements[node.id.replace('_parent', '')];
      }
    }, clonned.tree);

    return clonned;
  }

exports.getUniqueBehaviorsFor = function(profile) {
    var found = {};
    var behaviors = getBehaviorsFor(profile).filter(function (b) {
      var hold = false;
      if (!found[b.name]) {
        found[b.name] = true;
        hold = true;
      }
      return hold;
    });
    return behaviors;
  }
