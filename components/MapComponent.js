import { observer } from 'mobx-react';
import React from 'react';
import Iframe from 'react-iframe';
/*import storybox from "../storybox/map.html";*/

@observer
export default class PMapComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  var entered = false;
window.addEventListener('message', (event) => {
if(event.data=="down"&&entered==true){document.getElementById('persona').style.display='none';document.getElementById('chat').style.display='none';document.getElementById('glcontainer').style.display='none';}
if(event.data=="up"&&entered==true){document.getElementById('persona').style.display='';document.getElementById('chat').style.display='';document.getElementById('glcontainer').style.display='block';}
if(event.data=="enter"){entered = true;document.getElementById('persona').style.display='';document.getElementById('chat').style.display='';document.getElementById('glcontainer').style.display='block';}

});

  }

  render() {
    return (
      <Iframe url="https://alivemachine.io/storybox/map.html"
        width="450px"
        height="450px"
        id="mapFrame"
        display="initial"
        position="relative"/>
    );
  }
}

