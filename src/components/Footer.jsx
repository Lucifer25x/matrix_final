import { RiMoneyDollarCircleFill } from "@remixicon/react"

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="left">
          <h3>Kafka</h3>
          <p>© 2021 Kafka. All rights reserved</p>
        </div>
        <div className="right">
          <RiMoneyDollarCircleFill size={25} />
          <span>USD</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer