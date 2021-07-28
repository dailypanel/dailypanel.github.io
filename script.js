let pendingDevs = [
  { name: 'Bruno', display: 'Bruno' },
  { name: 'Herivelton', display: 'Herivelton' },
  { name: 'Biguzzi', display: 'Biguzzi' },
  { name: 'Joel', display: 'Joel' },
  { name: 'Matheus', display: 'Matheus' },
  { name: 'Filipe', display: 'Filipe' },
  { name: 'Erivelto', display: 'Erivelto' },
  { name: 'Watanabe', display: 'Watanabe' }
];

let devSpeaking = {};
let pendingList = document.querySelector('[pending-list]');
let divDevSpeaking = document.querySelector('[dev-speaking]');

let removeChild = function (dev) {
  if(!!devSpeaking.display) {
    let retiredList = document.querySelector('[retired-list]');
    let retiredDiv = document.createElement('div');
    let attri = document.createAttribute('class');
    attri.value = 'col-md-3 dev text-center';
    retiredDiv.setAttributeNode(attri);
    retiredDiv.innerText = devSpeaking.display;
    retiredList.appendChild(retiredDiv);

  }

  devSpeaking = dev;
  divDevSpeaking.innerHTML = devSpeaking.name;
}

function displayPedingsDevs() {
  pendingDevs.forEach( d => {
    let devDiv = document.createElement('div');
    let attr = document.createAttribute('class');

    attr.value = 'col-md-3 dev text-center';

    devDiv.innerText = d.display;
    devDiv.setAttributeNode(attr);
    devDiv.onclick = function() {
      removeChild(d);
      this.parentElement.removeChild(this);
    }

    pendingList.appendChild(devDiv);
  });
}

displayPedingsDevs();
