title: pricing
docs: true
hideTitle: true
noDate: true
---

<h4 class="headline"><i class="material-icons">payment</i> Pricing</h4>

Our pricing is variable and gets calculated based on 3 metrics:

- Amount of words translated in your project
- Amount of downloads to your client (your users load your app / website)
- Amount of modifications you do using our application / API

There is a graduated price per unit. Find more information below the calculator.

[Signup for a free 14d trial](https://www.locize.io/register) - using the billing forecast in your project you always got your costs under control.

--------

### Price calculator

<div id="sets" class="pricing-sets">
</div>
<div class="pricing-row">
  <span class="pricing-label">words</span>
  <span>0</span>
  <input id="words" type="range" class="pricing-slider" min ="0" max="100000" value="2000" step="1000" />
  <span class="pricing-fromto">100000</span>
</div>
<div class="pricing-row">
  <span class="pricing-label">downloads</span>
  <span>0</span>
  <input id="downloads" type="range" class="pricing-slider" min ="0" max="2500000" value="10000" step="10000" />
  <span class="pricing-fromto">2500000</span>
</div>
<div class="pricing-row">
  <span class="pricing-label">modifications</span>
  <span>0</span>
  <input id="modifications" type="range" class="pricing-slider" min ="0" max="5000" value="100" step="100" />
  <span class="pricing-fromto">5000</span>
</div>
<div class="pricing-results">
  <div>
    <span class="pricing-label">subscription</span>
    <span id="resultSubscription"></span>
  </div>
  <div>
    <span class="pricing-label">words</span>
    <span id="resultWords"></span>
  </div>
  <div>
    <span class="pricing-label">downloads</span>
    <span id="resultDownloads"></span>
  </div>
  <div>
    <span class="pricing-label">modifications</span>
    <span id="resultModifications"></span>
  </div>
  <div>
    <span class="pricing-label"><strong>total</strong></span>
    <span id="resultTotal" class="pricing-resultTotal"></span>
    <div><small>prices excl. VAT | billed on a recurring monthly basis</small></div>
  </div>
</div>

<script>
  var prices = {
    subscription: 5,
    words: [
      { next: 10000, price: 0.004 },
      { next: 20000, price: 0.003 },
      { next: 20000, price: 0.002 },
      { price: 0.001 }
    ],
    downloads: [
      { next: 500000, price: 0.0002 },
      { next: 1000000, price: 0.00015 },
      { price: 0.0001 }
    ],
    modifications: [
      { next: 1000, price: 0.04 },
      { next: 2000, price: 0.03 },
      { next: 2000, price: 0.02 },
      { price: 0.01 }
    ]
  }

  var setData = [
    { name: 'small', mrr: '33$', words: 2000, downloads: 10000, modifications: 100 },
    { name: 'medium', mrr: '105$', words: 10000, downloads: 50000, modifications: 200 },
    { name: 'large', mrr: '345$', words: 37000, downloads: 100000, modifications: 375 },
    // { name: 'xlarge', mrr: '705$', words: 75000, downloads: 500000, modifications: 750 },
  ]

  // elements
  var selWord = document.getElementById('words');
  var resWord = document.getElementById('resultWords');
  var selDownload = document.getElementById('downloads');
  var resDownload = document.getElementById('resultDownloads');
  var selModification = document.getElementById('modifications');
  var resModification = document.getElementById('resultModifications');
  var resSubscription = document.getElementById('resultSubscription');
  var resTotal = document.getElementById('resultTotal');
  var sets = document.getElementById('sets');

  // buttons with presets
  function setValues(data) {
    selWord.value = data.words;
    selDownload.value = data.downloads;
    selModification.value = data.modifications;

    render(calculate());
  };

  setData.forEach(function(d) {
    var btn = document.createElement('button');
    btn.innerHTML = d.name;
    btn.setAttribute('class', 'btn btn-primary');
    btn.addEventListener('click', function(e) {
      setValues(d);
    });
    sets.appendChild(btn);
  });


  function calcOne(name, amount) {
    var ret = 0;
    var rest = amount;
    var itemPrices = prices[name];

    itemPrices.forEach(function(p) {
      if (rest <= 0) return;

      var newRest = p.next ? rest - p.next : -1;
      var charge = newRest >= 0 ? p.next : rest;
      ret = ret + (charge * p.price);

      rest = newRest;
    });

    return ret;
  }

  function calculate() {
    var costWords = calcOne('words', selWord.value);
    var costDownloads = calcOne('downloads', selDownload.value);
    var costModifications = calcOne('modifications', selModification.value);

    return {
      words: selWord.value,
      costWords: costWords,
      downloads: selDownload.value,
      costDownloads: costDownloads,
      modifications: selModification.value,
      costModifications: costModifications
    }
  }

  function render(costs) {
    resWord.innerHTML = costs.costWords.toFixed(2) + '$ (' + costs.words + ')';
    resDownload.innerHTML = costs.costDownloads.toFixed(2) + '$ (' + costs.downloads + ')';
    resModification.innerHTML = costs.costModifications.toFixed(2) + '$ (' + costs.modifications + ')';
    resSubscription.innerHTML = prices.subscription.toFixed(2) + '$ (' + 1 + ')';
    resTotal.innerHTML = (costs.costModifications + costs.costWords + costs.costDownloads + prices.subscription).toFixed(2) + '$';
  }

  selWord.addEventListener('change', function(e) { render(calculate()); });
  selDownload.addEventListener('change', function(e) { render(calculate()); });
  selModification.addEventListener('change', function(e) { render(calculate()); });

  render(calculate());
</script>

----------

#### graduated prices


##### words

- first 10000: $0.004
- next 20000: $0.003
- next 20000: $0.002
- more: $0.001

##### downloads

- first 500000: $0.0002
- next 1000000: $0.00015
- more: $0.0001


##### modifications

- first 1000: $0.04
- next 2000: $0.03
- next 2000: $0.02
- more: $0.01
