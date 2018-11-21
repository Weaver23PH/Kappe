import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./contact.scss";
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Point from 'ol/geom/Point.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import VectorSource from 'ol/source/Vector.js';
import {Icon, Style} from 'ol/style.js';


class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pointerClicked: false
        }
    }

    componentDidMount() {
        let contact = this;
        function greyscale(context) {
            var canvas = context.canvas;
            var width = canvas.width;
            var height = canvas.height;
            var inputData = context.getImageData(0, 0, width, height).data;
            var ctx = canvas.getContext('2d');
            ctx.canvas.width  = width;
            ctx.canvas.height = height;
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            var myImageData = ctx.createImageData(ctx.canvas.width, ctx.canvas.height);
            var d = myImageData.data;
            for(let i=0; i<inputData.length; i += 4){
                var r = inputData[i];
                var g = inputData[i + 1];
                var b = inputData[i + 2];
                // CIE luminance for the RGB
                var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                d[i+0] = v;	// Red
                d[i+1] = v;	// Green
                d[i+2] = v;	// Blue
                d[i+3] = 255;	// Alpha

            }
            ctx.removeAttribute("crossorigin");
            ctx.putImageData(myImageData,0,0);
        }

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
        rasterLayer.on('postcompose', function(event) {
            greyscale(event.context);
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
                contact.setState({
                    pointerClicked: !contact.state.pointerClicked
                })
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
            filter: "grayscale(70%)"
        };
        return (
            <div className={styles.map}>
                <div ref="mapContainer" style={style}>
                </div>
                {this.state.pointerClicked && <div className={styles.mapPopup}>
                    <h2>Get in touch with us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam aspernatur atque,
                        consequatur dolor, dolorum error facere fugit iusto, pariatur possimus quae quis recusandae
                        similique sint ut veritatis voluptatem voluptatum.</p>
                    <h2>Send us a message</h2>
                    <form>
                        <div>
                            <input type="text" value="name" placeholder="Name"/>
                            <input type="text" value="email" placeholder="email"/>
                            <input type="text" value="website" placeholder="website"/></div>
                        <div>

                            <textarea placeholder="Message"/>
                            <button type="submit" className="styles.submit">Submit</button>
                        </div>
                    </form>
                </div>
                }
            </div>
        )
    }
}

export default Contact;