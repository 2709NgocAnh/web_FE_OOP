import React from "react";
import "./Discount.scss";
import Modal from "react-modal";
function Discount({content,code,index}) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const coppyText = () => {
    return navigator.clipboard.writeText(
        `${code}`
    );
  };
  return (
        <div className="coupon_item" key={index}>
          <div className="coupon_body">
            <div className="coupon_head">
              <h3 className="coupon_title">NHẬP MÃ: {code}</h3>
              <div className="coupon_desc">
                Mã giảm 15.000 cho đơn hàng tối thiểu 399.000{" "}
              </div>
            </div>
            <div className="coupon_bottom">
              <button className="coupon_copy" data-ega-coupon="{code}" onClick={coppyText}>
                <span>Sao chép mã</span>
              </button>
              <span
                className="coupon_info_toggle"
                onClick={() => setIsOpen(true)}
              >
                Điều kiện
              </span>
            
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                className="content-discount"
              >
                <div className="coupon_info">
                  <h3 className="coupon_title">NHẬP MÃ: {code}</h3>
                  <h3 className="coupon_title">Mã khuyến mãi: {code}</h3>
                  - Mã giảm 15.000 cho đơn tối thiểu 399.000.
                  <br />- Mã khuyễn mãi không áp dụng với các sản phẩm collab.{" "}
                  <div className="coupon_btn">
                    <button onClick={() => setIsOpen(false)}>Đóng</button>
                    <button onClick={coppyText}>Sao chép mã </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
  );
}

export default Discount;
