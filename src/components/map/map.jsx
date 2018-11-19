import ReactDOM from 'react-dom';
import React from 'react';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import View from 'ol/View.js';
import Point from 'ol/geom/Point.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import VectorSource from 'ol/source/Vector.js';
import {Icon, Style} from 'ol/style.js';
import Cluster from 'ol/source/Cluster';
import SideMenu from "../sidemenu/sidemenu";

// import styles from 'ol/ol.css';

class Mappe extends React.Component {

    componentDidMount() {
        var wroclawCoords = [17.0333, 51.1098];

        // create feature layer and vector source
        var vectorSource = new VectorSource({});
        var vectorLayer = new VectorLayer({
            source: vectorSource,
            updateWhileAnimating: true,
            updateWhileInteracting: true
        });
        var rasterLayer = new TileLayer({
            source: new OSM()
        });
        var map = new Map({
            layers: [rasterLayer, vectorLayer],
            target: this.refs.mapContainer,
            view: new View({
                projection: "EPSG:4326",
                center: wroclawCoords,
                zoom: 13
            })
        });




        map.on('click', this.handleMapClick.bind(this));

        // save map and layer references to local state
        this.setState({
            map: map,
        });

    }

    handleMapClick(event) {


        // derive map coordinate (references map from Wrapper Component state)
        var clickedCoordinate = this.state.map.getCoordinateFromPixel(event.pixel);


    }

    render() {
        let style= {
            height: "100%",
            width: "100%"
        }
        return (
            <div ref="mapContainer" style={style}></div>
        );
    }

}
export default Mappe;