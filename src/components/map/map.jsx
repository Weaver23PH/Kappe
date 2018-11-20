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


class Mappe extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        let showParentPopup = this.props;
        let wroclawCoords = [17.0333, 51.1098];
        let vectorSource = new VectorSource({});
        let vectorLayer = new VectorLayer({
            source: vectorSource,
            updateWhileAnimating: true,
            updateWhileInteracting: true
        });
        let rasterLayer = new TileLayer({
            source: new OSM()
        });
        let map = new Map({
            layers: [rasterLayer, vectorLayer],
            target: this.refs.mapContainer,
            view: new View({
                projection: "EPSG:4326",
                center: wroclawCoords,
                zoom: 13
            })
        });
        let iconFeature = new Feature({
            projection: "EPSG:4326",
            geometry: new Point(wroclawCoords),
            name: "Kappe "
        });
        let iconStyle = new Style({
            image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
                anchor: [0.5, 35],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                scale: 0.1,
                src: 'http://chittagongit.com//images/map-icon-vector-free/map-icon-vector-free-1.jpg'
            }))
        });
        iconFeature.setStyle(iconStyle);
        vectorSource.addFeature(iconFeature);
        map.on('click', function (evt) {
            let feature = map.forEachFeatureAtPixel(evt.pixel,
                function (feature) {
                    return feature;
                });
            if (feature) {
                showParentPopup;
                console.log("clicked");
            }
        });
        map.on('pointermove', function (e) {
            let pixel = map.getEventPixel(e.originalEvent);
            let hit = map.hasFeatureAtPixel(pixel);
            map.getTarget().style.cursor = hit ? 'pointer' : '';
        });
    }

    render() {
        let style = {
            height: "100%",
            width: "100%",
            filter: "grayscale(100%)"
        };
        return (
            <div ref="mapContainer" style={style}></div>
        );
    }

}

export default Mappe;