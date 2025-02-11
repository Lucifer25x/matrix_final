// Import libraries
import { RiTwitterFill, RiFacebookFill, RiYoutubeFill, RiInstagramFill } from "@remixicon/react";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/pages/Contact.css";

// Contact page
const Contact = () => {
    return (
        <div className="contact-page">
            <h1><StaticLang en="Contact Us" az="Bizimlə Əlaqə Saxla" /></h1>

            <div className="sections">
                <div className="section">
                    <p>
                        <StaticLang en="If you've any questions about any of our albums or simply want to get in touch, we'd love to hear from you."
                            az="Albomlarımızla bağlı hər hansı sualınız varsa və ya sadəcə əlaqə saxlamaq istəyirsinizsə, sizdən eşitmək istərdik." />
                    </p>

                    <p>
                        <StaticLang en="You can simply complete the form or email us at hello@therecordhub.com and we'll get back to you as soon as possible."
                            az="Siz sadəcə formanı doldura və ya hello@therecordhub.com ünvanına e-poçt göndərə bilərsiniz və biz sizə ən qısa zamanda cavab verəcəyik." />
                    </p>

                    <p>
                        9 Whitefriars Aungier Street,
                        Dublin, D02XE48
                    </p>

                    <p>
                        The Record Hub.
                    </p>

                    <div className="social">
                        <a href="https://twitter.com/therecordhub" target="_blank">
                            <RiTwitterFill />
                        </a>
                        <a href="https://facebook.com/therecordhub" target="_blank">
                            <RiFacebookFill />
                        </a>
                        <a href="https://youtube.com/therecordhub" target="_blank">
                            <RiYoutubeFill />
                        </a>
                        <a href="https://instagram.com/therecordhub" target="_blank">
                            <RiInstagramFill />
                        </a>
                    </div>
                </div>

                <div className="section">
                    <input type="text" placeholder="Name*" />
                    <input type="email" placeholder="Email*" />
                    <textarea id="message" placeholder="Message*"></textarea>
                    <button><StaticLang en="SUBMIT" az="TƏSDİQ EDİN" /></button>
                </div>
            </div>
        </div>
    )
}

export default Contact