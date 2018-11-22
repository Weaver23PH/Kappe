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
            pointerClicked: false,
            name: "",
            website: "",
            email: "",
            message: ""
        }
    }

    componentDidMount() {
        let contact = this;
        let KappeCoords = [144.9578, -37.81];
        let vectorSource = new VectorSource({});
        let vectorLayer = new VectorLayer({
            source: vectorSource,
            updateWhileAnimating: true,
            updateWhileInteracting: true,
        });
        let rasterLayer = new TileLayer({
            source: new OSM(),
            crossOrigin: "anonymous"
        });
        let map = new Map({
            layers: [rasterLayer, vectorLayer],
            target: this.refs.mapContainer,
            view: new View({
                projection: "EPSG:4326",
                center: KappeCoords,
                zoom: 14
            })
        });
        let iconFeature = new Feature({
            projection: "EPSG:4326",
            geometry: new Point(KappeCoords),
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

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };
    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
    };
    handleWebChange = (event) => {
        this.setState({
            website: event.target.value
        });
    };
    handleMessageChange = (event) => {
        this.setState({
            message: event.target.value
        });
    };

    render() {

        let style = {
            height: "100%",
            width: "100%",
            filter: "grayscale(50%)"
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
                        <div className={styles.contactData}>
                            <div className={styles.inputBox}>
                                <i className="fas fa-user"></i>
                                <input type="text" value={this.state.name} onChange={this.handleNameChange}
                                       placeholder="Name" size="40"/>
                            </div>
                            <div className={styles.inputBox}>
                                <i className="far fa-envelope"></i>
                                <input type="text" value={this.state.email} onChange={this.handleEmailChange}
                                       placeholder="email" size="40"/>
                            </div>
                            <div className={styles.inputBox}>
                                <i className="fas fa-link"></i>
                                <input type="text" value={this.state.website} onChange={this.handleWebChange}
                                       placeholder="website" size="40"/>
                            </div>
                        </div>
                        <div className={styles.contactData}>
                            <textarea value={this.state.message} cols="40" rows="5" onChange={this.handleMessageChange}
                                      placeholder="Message"/>
                            <button type="submit" className="styles.submit">SEND NOW</button>
                        </div>
                    </form>
                </div>
                }
            </div>
        )
    }
}

export default Contact;