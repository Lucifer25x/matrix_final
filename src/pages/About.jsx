// Import libraries
import { useEffect } from "react";
import { RiTwitterFill, RiFacebookFill, RiYoutubeFill, RiInstagramFill } from '@remixicon/react';
import StaticLang from "../utils/StaticLang";

// Import images
import vinyl from "../assets/images/vinyl-record.jpg";

// Import styles
import "../assets/styles/pages/About.css";

// About page
const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "About us | The Record Hub";
    }, []);

    return (
        <div className="about-page" data-aos="fade-up">
            <h1><StaticLang en="About us" az="Haqqımızda" /></h1>

            <div className="content">
                <div className="text">
                    <p>
                        <b><StaticLang en="The Record Hub is your local online record store and is here to help music lovers discover and grow their love of vinyl."
                            az="Record Hub sizin yerli onlayn səsyazma mağazanızdır və musiqisevərlərə vinil sevgisini kəşf etməyə və böyütməyə kömək etmək üçün buradadır." /></b>
                    </p>

                    <p>
                        <StaticLang en="100% Irish and based in Dublin, we stock everything from essential catalogue to must-have new releases, turntable hardware & speakers to vinyl accessories and everything in-between."
                            az="100% İrlandiya və Dublində yerləşir, biz əsas kataloqdan tutmuş yeni buraxılışlara, dönər aparatına və dinamiklərə qədər vinil aksessuarlara və aralarındakı hər şeyə qədər hər şeyi ehtiyatda saxlayırıq." />
                    </p>

                    <p>
                        <StaticLang en="If you can't find what you need or just want to wax lyrical about vinyl, drop us a line on hello@therecordhub.com"
                            az="Ehtiyacınız olanı tapa bilmirsinizsə və ya sadəcə vinil haqqında lirik mumlamaq istəyirsinizsə, hello@therecordhub.com ünvanına bizə yazın." />
                    </p>

                    <p>
                        <StaticLang en="Therecordhub.com - Everyone's local online record shop."
                            az="Therecordhub.com - Hər kəsin yerli onlayn səsyazma mağazası." />
                    </p>

                    <p>
                        <i>
                            <StaticLang en="100% Irish. Direct to your door. Free Shipping. Supporting Local."
                                az="100% irland. Birbaşa qapınıza. Pulsuz Çatdırılma. Yerli Dəstək." />
                        </i>
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

                <div className="image">
                    <img src={vinyl} alt="Vinyl record" />
                </div>
            </div>
        </div>
    )
}

export default About