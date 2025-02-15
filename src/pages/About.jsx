// Import libraries
import { useEffect } from "react";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/pages/About.css";

// About page
const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "About us | The Record Hub";
    }, []);

    return (
        <div className="about-page">
            <h1><StaticLang en="About us" az="Haqqımızda" /></h1>

            <p>
                <StaticLang en="The Record Hub is your local online record store and is here to help music lovers discover and grow their love of vinyl."
                    az="Record Hub sizin yerli onlayn səsyazma mağazanızdır və musiqisevərlərə vinil sevgisini kəşf etməyə və böyütməyə kömək etmək üçün buradadır." />
            </p>

            <p>
                <StaticLang en="100% Irish and based in Dublin, we stock everything from essential catalogue to must-have new releases, turntable hardware & speakers to vinyl accessories and everything in-between."
                    az="100% İrlandiya və Dublində yerləşir, biz əsas kataloqdan tutmuş yeni buraxılışlara, dönər aparatına və dinamiklərə qədər vinil aksessuarlara və aralarındakı hər şeyə qədər hər şeyi ehtiyatda saxlayırıq." />
            </p>

            <p>
                <StaticLang en="We want to make your vinyl shopping experience as easy as possible. Whether you are browsing, discovering, completing the collection or just looking for reviews and advice, we’re there for you on the other side of the counter."
                    az="Vinil alış-veriş təcrübənizi mümkün qədər asanlaşdırmaq istəyirik. İstər kolleksiyaya baxırsınız, kəşf edirsiniz, tamamlayırsınız, istərsə də sadəcə rəylər və məsləhətlər axtarırsınızsa, biz sayğacın digər tərəfində sizinləyik." />
            </p>

            <p>
                <StaticLang en="Follow us on our social channels to keep up to date with new releases, TRH exclusive titles, our Irish vinyl collection and the latest recommendations."
                    az="Yeni buraxılışlar, TRH eksklüziv başlıqları, İrlandiya vinil kolleksiyamız və ən son tövsiyələrdən xəbərdar olmaq üçün bizi sosial kanallarımızda izləyin." />
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
        </div>
    )
}

export default About