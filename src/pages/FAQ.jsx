// Import libraries
import { useEffect } from "react";
import StaticLang from "../utils/StaticLang";

// Import styles
import "../assets/styles/pages/FAQ.css";

// FAQ page
const FAQ = () => {
    useEffect(() => {
        document.title = "FAQ | The Record Hub";
    }, []);
    
    return (
        <div className="faq-page">
            <h1><StaticLang en="Frequently asked questions" az="Tez-tez verilən suallar" /></h1>

            <div className="section">
                <h2><StaticLang en="Where's my order?" az="Sifarişim haradadır?" /></h2>

                <p>
                    <StaticLang en="Once your order has shipped you will receive a confirmation email which contains tracking information. You can also look up the status of your shipment on our Order Lookup page."
                        az="Sifarişiniz göndərildikdən sonra izləmə məlumatını ehtiva edən təsdiq e-poçtu alacaqsınız. Siz həmçinin Sifariş Axtarış səhifəmizdə göndərişinizin statusuna baxa bilərsiniz." />
                </p>

                <p>
                    <StaticLang en="Its Christmas so it's a little busy. We are still committed to quick delivery direct to your door, but please do allow extra time for your shopping with us this December. Our delivery partners have warned of congestion in the network so please order early to avoid any delays in delivery."
                        az="Milad olduğu üçün bir az məşğuldur. Biz hələ də birbaşa qapınıza tez çatdırılma öhdəliyimizə sadiqik, lakin bu dekabr ayında bizimlə alış-veriş etmək üçün əlavə vaxt ayırın. Çatdırılma partnyorlarımız şəbəkədə sıxlıq barədə xəbərdarlıq ediblər, ona görə də çatdırılmada gecikmələrin qarşısını almaq üçün əvvəlcədən sifariş verin." />
                </p>

                <p>
                    <StaticLang en="Once your order has left TheRecordHub.com you will receive a confirmation email which contains tracking information from An Post, this means your new record is making its way to you. You can also look up the status of your shipment on our Order Lookup page."
                        az="Sifarişiniz TheRecordHub.com-u tərk etdikdən sonra Siz Postdan izləmə məlumatını ehtiva edən təsdiq e-poçtu alacaqsınız, bu o deməkdir ki, yeni rekordunuz sizə çatır. Siz həmçinin Sifariş Axtarış səhifəmizdə göndərişinizin statusuna baxa bilərsiniz." />
                </p>

                <p>
                    <StaticLang en="Please check your tracking number for the latest updates to your delivery and allow up to 5 working days for delivery from time of order. All orders on TheRecordHub.com are trackable via An Post."
                        az="Çatdırılmanıza dair ən son yeniləmələr üçün izləmə nömrənizi yoxlayın və sifariş verildiyi andan çatdırılma üçün 5 iş gününə qədər vaxt verin. TheRecordHub.com saytındakı bütün sifarişlər Post vasitəsilə izlənilə bilər." />
                </p>

                <p>
                    <StaticLang en="Please note that our delivery packaging contains our brand logo and is identifiable."
                        az="Nəzərə alın ki, çatdırılma qablaşdırmamızda brend loqosu var və müəyyən edilə bilər." />
                </p>
            </div>

            <div className="section">
                <h2><StaticLang en="Christmas Postage Dates 2024" az="Milad Poçt Tarixləri 2024" /></h2>

                <p>
                    <StaticLang en="An-Post and our delivery partners have advised us of the below last guaranteed delivery dates for our shipments. We advise customers to order early, regardless as delays can occur."
                        az="An-Post və çatdırılma üzrə tərəfdaşlarımız bizə göndərişlərimiz üçün aşağıdakı zəmanətli çatdırılma tarixləri barədə məlumat verdilər. Müştərilərə gecikmələrin baş verə biləcəyindən asılı olmayaraq, erkən sifariş etməyi tövsiyə edirik." />
                </p>

                <table>
                    <tbody>
                        <tr>
                            <td><StaticLang en="Republic Of Ireland" az="İrlandiya Respublikası" /></td>
                            <td><StaticLang en="December 18th" az="18 Dekabr" /></td>
                        </tr>
                        <tr>
                            <td><StaticLang en="Northern Ireland & Great Britain" az="Şimali İrlandiya və Böyük Britaniya" /></td>
                            <td><StaticLang en="December 16th" az="16 Dekabr" /></td>
                        </tr>
                        <tr>
                            <td><StaticLang en="Rest Of Europe" az="Qalan Avropa" /></td>
                            <td><StaticLang en="December 14th" az="14 Dekabr" /></td>
                        </tr>
                        <tr>
                            <td><StaticLang en="USA & Rest Of World" az="ABŞ və Dünyanın Qalanı" /></td>
                            <td><StaticLang en="December 5th" az="5 Dekabr" /></td>
                        </tr>
                    </tbody>
                </table>

                <p>
                    (<StaticLang en="Digital Gift Cards deliver immediatley via email" az="Rəqəmsal Hədiyyə Kartları dərhal e-poçt vasitəsilə çatdırılır" />)
                </p>
            </div>

            <div className="section">
                <h2><StaticLang en="What's your refund policy?" az="Geri ödəmə siyasətiniz nədir?" /></h2>

                <p>
                    <StaticLang en="Simply put, if you're not happy, we're not happy. If within 14 days of receiving your package, you discover that something is not quite right then please contact us at hello@therecordhub.com and we'll do our best to make it right."
                        az="Sadəcə olaraq, siz xoşbəxt deyilsinizsə, biz də xoşbəxt deyilik. Paketinizi aldıqdan sonra 14 gün ərzində nəyinsə düzgün olmadığını aşkar etsəniz, lütfən, hello@therecordhub.com ünvanında bizimlə əlaqə saxlayın və biz bunu düzəltmək üçün əlimizdən gələni edəcəyik." />
                </p>
            </div>

            <div className="section">
                <h2><StaticLang en="Which countries do you ship to?" az="Hansı ölkələrə göndərirsiniz?" /></h2>

                <p>
                    <StaticLang en="All except those excluded above." az="Yuxarıdakı istisnalar istisna olmaqla, hamısı." />
                </p>
            </div>

            <div className="section">
                <h2><StaticLang en="How long does delivery take?" az="Çatdırılma nə qədər vaxt aparır?" /></h2>

                <p>
                    <StaticLang en="All our orders are shipped from our warehouse in Ireland by tracked shipping."
                        az="Bütün sifarişlərimiz izlənilən göndərmə ilə İrlandiyadakı anbarımızdan göndərilir." />
                </p>

                <table>
                    <thead>
                        <tr>
                            <th><StaticLang en="Location" az="Məkan" /></th>
                            <th><StaticLang en="Estimated Shipping Time" az="Təxmini Göndərmə Vaxtı" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><StaticLang en="Ireland" az="İrlandiya" /></td>
                            <td><StaticLang en="2-4 business days" az="2-4 iş günü" /></td>
                        </tr>
                        <tr>
                            <td><StaticLang en="United Kingdom" az="Böyük Britaniya" /></td>
                            <td><StaticLang en="4-6 business days" az="4-6 iş günü" /></td>
                        </tr>
                        <tr>
                            <td><StaticLang en="Europe" az="Avropa" /></td>
                            <td><StaticLang en="8-10 business days" az="8-10 iş günü" /></td>
                        </tr>
                        <tr>
                            <td><StaticLang en="Rest Of The World" az="Dünyanın Qalanı" /></td>
                            <td><StaticLang en="10-14 business days" az="10-14 iş günü" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="section">
                <h2><StaticLang en="Can I track my order?" az="Sifarişimi izləyə bilərəmmi?" /></h2>

                <p>
                    <StaticLang en="Yes, all our orders are sent via tracked shipping. Once your package has left our warehouse you will be sent an email with tracking details. Please note that it can sometimes take up to 24 hours for this tracking info to become active."
                        az="Bəli, bütün sifarişlərimiz izlənilən göndərmə ilə göndərilir. Paketiniz anbarımızı tərk etdikdən sonra sizə izləmə təfərrüatları olan e-poçt göndəriləcək. Nəzərə alın ki, bu izləmə məlumatının aktivləşməsi bəzən 24 saat çəkə bilər." />
                </p>
            </div>

            <div className="section">
                <h2><StaticLang en="What currency am I charged in?" az="Məndən hansı valyutada ödəniş alınır?" /></h2>

                <p>
                    <StaticLang en="We can process orders in most major currencies. Simply select the currency you wish to be charged in from the drop-down menu at the top of the page. Currencies available"
                        az="Biz əksər əsas valyutalarda sifarişləri emal edə bilərik. Sadəcə olaraq səhifənin yuxarısındakı açılan menyudan ödəniş etmək istədiyiniz valyutanı seçin. Mövcud valyutalar" />
                    : EUR, GBP, USD, CAD, AUD, NZD, DKK, HKD, JPY, SGD
                </p>
            </div>

            <div className="section">
                <h2><StaticLang en="Do you have a rewards/loyalty scheme?" az="Mükafat/sadiqlik sxeminiz var?" /></h2>

                <p>
                    <StaticLang en="We do. To join, simply go to our Rewards page and in the pop-up window, click Join Now. If you've already created an account when you checked out on a previous purchase you can use those details to login."
                        az="Biz edirik. Qoşulmaq üçün sadəcə olaraq Mükafatlar səhifəmizə keçin və açılan pəncərədə İndi Qoşulun düyməsini klikləyin. Əgər əvvəlki satınalmanı yoxladığınız zaman artıq hesab yaratmısınızsa, daxil olmaq üçün həmin məlumatlardan istifadə edə bilərsiniz." />
                </p>

                <p>
                    <StaticLang en="For every €1 you spend you get 2 points. And for every 100 points you accrue you get €1 worth of store credit to spend on a subsequent purchase."
                        az="Xərclədiyiniz hər €1 üçün 2 xal qazanırsınız. Siz topladığınız hər 100 xal üçün növbəti alışa xərcləmək üçün 1 avro dəyərində mağaza krediti əldə edirsiniz." />
                </p>

                <p>
                    <StaticLang en="Also, for every friend you refer, you get 500 points (€5) - you can get your referral link to share when you login. Just share the link and when a friend makes a purchase via your link, you'll get 500 points."
                        az="Həmçinin, müraciət etdiyiniz hər bir dostunuz üçün 500 xal (5€) qazanırsınız - daxil olduğunuz zaman paylaşmaq üçün referal linkinizi əldə edə bilərsiniz. Sadəcə linki paylaşın və dostunuz linkiniz vasitəsilə alış-veriş etdikdə siz 500 xal qazanacaqsınız." />
                </p>

                <p>
                    <StaticLang en="The sooner you join the sooner you'll start accruing points."
                        az="Nə qədər tez qoşulsanız, bir o qədər tez xal toplamağa başlayacaqsınız." />
                </p>
            </div>

            <div className="section">
                <h2><StaticLang en="Do you accept One4All cards?" az="One4All kartlarını qəbul edirsiniz?" /></h2>

                <p>
                    <StaticLang en="We do accept One4All, but due to an EU Anti-Money Laundering Directive that came into force in January 2020, any orders over €50 will be declined. If you make an order with a total value under €50, it will be accepted."
                        az="Biz One4All-u qəbul edirik, lakin 2020-ci ilin yanvarında qüvvəyə minən Aİ-nin Çirkli Pulların Yuyulmasına Qarşı Mübarizə Direktivinə görə, 50 avrodan yuxarı istənilən sifarişlər rədd ediləcək. Ümumi dəyəri €50-dan az olan bir sifariş etsəniz, qəbul ediləcək." />
                </p>

                <p>
                    <b><StaticLang en="Please also note" az="Həmçinin qeyd edin" />:</b>
                    <StaticLang en="you must checkout using the regular checkout with One4All cards. ShopPay checkout will not accept them."
                        az="One4All kartları ilə adi ödənişdən istifadə edərək ödəniş etməlisiniz. ShopPay yoxlaması onları qəbul etməyəcək." />
                </p>
            </div>

            <div className="section">
                <h2><StaticLang en="Are product images accurate?" az="Məhsul şəkilləri dəqiqdirmi?" /></h2>

                <p>
                    <StaticLang en="As much as possible our product images give an indication of what you should receive. There may be colour shading variations however, as they are graphical representations."
                        az="Mümkün qədər məhsul şəkillərimiz sizə nə almalı olduğunuzu göstərir. Bununla birlikdə, qrafik təsvirlər olduğu üçün rəng kölgəsi varyasyonları ola bilər." />
                </p>
            </div>

            <div className="section">
                <h2><StaticLang en="Brexit Proof Vinyl Shopping In Ireland" az="İrlandiyada Brexit Proof Vinil Alış-veriş" /></h2>

                <p>
                    <StaticLang en="The Record Hub is 100% Irish and based in Dublin. This means that Republic of Ireland customers will face no extra VAT or Customs charges on any of their purchases. The price you see at checkout is the final charge."
                        az="Record Hub 100% İrlandiyadır və Dublində yerləşir. Bu o deməkdir ki, İrlandiya Respublikasının müştəriləri heç bir alış-verişinə görə əlavə ƏDV və ya Gömrük rüsumu ilə üzləşməyəcəklər. Kassada gördüyünüz qiymət son ödənişdir." />
                </p>

                <p>
                    <StaticLang en="As we are based in the Republic Of Ireland, this also means that there are minimal expected delays in your Irish delivery. All Republic Of Ireland orders are direct to your door and completely trackable thanks to our delivery partners at An Post."
                        az="İrlandiya Respublikasında yerləşdiyimiz üçün bu, həmçinin İrlandiya çatdırılmasında minimum gözlənilən gecikmələrin olması deməkdir. İrlandiya Respublikasının bütün sifarişləri birbaşa qapınıza çatdırılır və An Post-da çatdırılma tərəfdaşlarımız sayəsində tamamilə izlənilə bilər." />
                </p>

                <p>
                    <StaticLang en="If you need further assistance with your order you can contact us at hello@therecordhub.com"
                        az="Sifarişinizlə bağlı əlavə yardıma ehtiyacınız varsa, hello@therecordhub.com ünvanında bizimlə əlaqə saxlaya bilərsiniz" />
                </p>
            </div>
        </div>
    )
}

export default FAQ