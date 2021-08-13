const devList = [
  { name: 'Bruno', display: 'Bruno' },
  { name: 'Herivelton', display: 'Herivelton' },
  { name: 'Biguzzi', display: 'Biguzzi' },
  { name: 'Joel', display: 'Joel' },
  { name: 'Matheus', display: 'Matheus' },
  { name: 'Filipe', display: 'Filipe' },
  { name: 'Wisky', display: 'Wisky' },
  { name: 'Watanabe', display: 'Watanabe' },
  { name: 'Denis', display: 'Denis' }
];

let devsToSpeak = devList;
let devSpeaking = {};
let retiredList = document.querySelector('[retired-list]');
let pendingList = document.querySelector('[pending-list]');
let divDevSpeaking = document.querySelector('[dev-speaking]');

let removeChild = function (dev, index) {
  // debugger
  if(!!devSpeaking.display) {
    let retiredDiv = document.createElement('div');
    let attri = document.createAttribute('class');

    attri.value = 'col-md-3 dev text-center';
    retiredDiv.setAttributeNode(attri);
    retiredDiv.innerText = devSpeaking.display;
    retiredList.appendChild(retiredDiv);
  }
  
  devsToSpeak.splice(index, 1);
  devSpeaking = dev;
  divDevSpeaking.innerHTML = devSpeaking.name;
}

// o primeiro ainda não está removendo

divDevSpeaking.addEventListener('click', function() {
  if(!!devSpeaking.name) { return; }
  let rndInt = Math.floor(Math.random() * devsToSpeak.length);
  removeChild(devsToSpeak[rndInt], rndInt);
  displayPedingsDevs();
});

function displayPedingsDevs() {
  pendingList.innerHTML = '';
  devsToSpeak.forEach( (d, i) => {
    let devDiv = document.createElement('div');
    let attr = document.createAttribute('class');

    attr.value = 'col-md-3 dev text-center';

    devDiv.innerText = d.display;
    devDiv.setAttributeNode(attr);
    devDiv.onclick = function() {
      devsToSpeak.splice(i, 1);
      removeChild(d, i);
      this.parentElement.removeChild(this);
    }

    pendingList.appendChild(devDiv);
  });
}


displayPedingsDevs();
