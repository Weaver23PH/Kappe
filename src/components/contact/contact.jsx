import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./contact.scss";
import Mappe from "../map/map"

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pointerClicked: false
        }

    }

    handleClick = () => {
        this.setState({
            pointerClicked: !this.state.pointerClicked
        });
    };



    render() {
        return (
            <div className={styles.map} onClick={this.handleClick}>
                <Mappe/>
                {this.state.pointerClicked && <div className={styles.mapPopup}>
                    <div>
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
                </div>}
            </div>
        )
    }
}

export default Contact;