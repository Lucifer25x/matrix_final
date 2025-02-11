// TODO: Add translation

// Import styles
import "../assets/styles/pages/FAQ.css";


// FAQ page
const FAQ = () => {
    return (
        <div className="faq-page">
            <h1>Frequently asked questions</h1>

            <div className="section">
                <h2>Where's my order?</h2>

                <p>
                    Once your order has shipped you will receive a confirmation email which contains tracking information. You can also look up the status of your shipment on our Order Lookup page.
                </p>

                <p>
                    Its Christmas so it's a little busy. We are still committed to quick delivery direct to your door, but please do allow extra time for your shopping with us this December. Our delivery partners have warned of congestion in the network so please order early to avoid any delays in delivery.
                </p>

                <p>
                    Once your order has left TheRecordHub.com you will receive a confirmation email which contains tracking information from An Post, this means your new record is making its way to you. You can also look up the status of your shipment on our Order Lookup page.
                </p>

                <p>
                    Please check your tracking number for the latest updates to your delivery and allow up to 5 working days for delivery from time of order. All orders on TheRecordHub.com are trackable via An Post.
                </p>

                <p>
                    Please note that our delivery packaging contains our brand logo and is identifiable.
                </p>
            </div>

            <div className="section">
                <h2>Christmas Postage Dates 2024</h2>

                <p>
                    An-Post and our delivery partners have advised us of the below last guaranteed delivery dates for our shipments. We advise customers to order early, regardless as delays can occur.
                </p>

                <table>
                    <tbody>
                        <tr>
                            <td>Republic Of Ireland</td>
                            <td>December 18th</td>
                        </tr>
                        <tr>
                            <td>Northern Ireland & Great Britian</td>
                            <td>December 16th</td>
                        </tr>
                        <tr>
                            <td>Rest Of Europe</td>
                            <td>December 14th</td>
                        </tr>
                        <tr>
                            <td>USA & Rest Of World</td>
                            <td>December 05th</td>
                        </tr>
                    </tbody>
                </table>

                <p>
                    (Digital Gift Cards deliver immediatley via email)
                </p>
            </div>

            <div className="section">
                <h2>What's your refund policy?</h2>

                <p>
                    Simply put, if you're not happy, we're not happy. If within 14 days of receiving your package, you discover that something is not quite right then please contact us at hello@therecordhub.com and we'll do our best to make it right.
                </p>
            </div>

            <div className="section">
                <h2>Which countries do you ship to?</h2>

                <p>
                    All except those excluded above.
                </p>
            </div>

            <div className="section">
                <h2>How long does delivery take?</h2>

                <p>
                    All our orders are shipped from our warehouse in Ireland by tracked shipping.
                </p>

                <table>
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Estimated Shipping Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ireland</td>
                            <td>2-4 business days</td>
                        </tr>
                        <tr>
                            <td>United Kingdom</td>
                            <td>4-6 business days</td>
                        </tr>
                        <tr>
                            <td>Europe</td>
                            <td>8-10 business days</td>
                        </tr>
                        <tr>
                            <td>Rest Of The World</td>
                            <td>10-14 business days </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="section">
                <h2>Can I track my order?</h2>

                <p>
                    Yes, all our orders are sent via tracked shipping. Once your package has left our warehouse you will be sent an email with tracking details. Please note that it can sometimes take up to 24 hours for this tracking info to become active.
                </p>
            </div>

            <div className="section">
                <h2>What currency am I charged in?</h2>

                <p>
                    We can process orders in most major currencies. Simply select the currency you wish to be charged in from the drop-down menu at the top of the page. Currencies available: EUR, GBP, USD, CAD, AUD, NZD, DKK, HKD, JPY, SGD
                </p>
            </div>

            <div className="section">
                <h2>Do you have a rewards/loyalty scheme?</h2>

                <p>
                    We do. To join, simply go to our Rewards page and in the pop-up window, click Join Now. If you've already created an account when you checked out on a previous purchase you can use those details to login.
                </p>

                <p>
                    For every €1 you spend you get 2 points. And for every 100 points you accrue you get €1 worth of store credit to spend on a subsequent purchase.
                </p>

                <p>
                    Also, for every friend you refer, you get 500 points (€5) - you can get your referral link to share when you login. Just share the link and when a friend makes a purchase via your link, you'll get 500 points.
                </p>

                <p>
                    The sooner you join the sooner you'll start accruing points.
                </p>
            </div>

            <div className="section">
                <h2>Do you accept One4All cards?</h2>

                <p>
                    We do accept One4All, but due to an EU Anti-Money Laundering Directive that came into force in January 2020, any orders over €50 will be declined. If you make an order with a total value under €50, it will be accepted.
                </p>

                <p>
                    <b>Please also note:</b> you must checkout using the regular checkout with One4All cards. ShopPay checkout will not accept them.
                </p>
            </div>

            <div className="section">
                <h2>Are product images accurate?</h2>

                <p>
                    As much as possible our product images give an indication of what you should receive. There may be colour shading variations however, as they are graphical representations.
                </p>
            </div>

            <div className="section">
                <h2>Brexit Proof Vinyl Shopping In Ireland</h2>

                <p>
                    The Record Hub is 100% Irish and based in Dublin. This means that Republic of Ireland customers will face no extra VAT or Customs charges on any of their purchases. The price you see at checkout is the final charge.
                </p>

                <p>
                    As we are based in the Republic Of Ireland, this also means that there are minimal expected delays in your Irish delivery. All Republic Of Ireland orders are direct to your door and completely trackable thanks to our delivery partners at An Post.
                </p>

                <p>
                    If you need further assistance with your order you can contact us at hello@therecordhub.com
                </p>
            </div>
        </div>
    )
}

export default FAQ