import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { DataContext } from "~/customer/components/dataProvider/DataProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import "./Details.scss";
import Price from "../shop/component/price/Price";
import * as productService from "~/admin/services/productService";
import { Image } from "cloudinary-react";

export default function Details() {
  const { id } = useParams();
  const value = useContext(DataContext);
  const addCart = value.addCart;
  const [current, setCurrent] = useState();
  const [index, setIndex] = useState(0);
  TabTitle(current?.name || "Chi tiết sản phẩm");
  useEffect(() => {
    const fetchApi = async () => {
      const response = await productService.getAProduct(id);
      setCurrent(response.product[0]);
    };
    fetchApi();
  }, [id]);

  return current ? (
    <div className="details" key={current?.id}>
      <div className="imgContainer">
        <Image
          className="cellImg"
          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
          publicId={
            current.images.length ? current.images[index] : current.images
          }
        />

        <div className="thumb">
          {current.images?.map((img, index) => (
            <Image
              className="cellImg"
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
              publicId={img}
              onClick={() => setIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="box-details">
        <h2 className="title" title={current?.name}>
          {current?.name}
        </h2>
        {current?.price_sale != null ? (
          <Price
            price={current.price}
            priceSale={current.price_sale}
            isSale={true}
          />
        ) : (
          <Price
            price={current.price}
            priceSale={current.price_sale}
            isSale={false}
          />
        )}
        <button className="card-button" onClick={() => addCart(current, 1)}>
          Add to cart
        </button>
        <NavLink to="/payment">
          <button
            className=" card-button card-button--buynow"
            onClick={() => addCart(current, 1)}
          >
            Mua Ngay
          </button>
        </NavLink>
        <p style={{ width: "800px" }}>{current?.content}</p>
      </div>
    </div>
  ) : (
    <div style={{ display: "flex", margin: 50 }}>
      <Skeleton height={300} width={300} />
      <div style={{ display: "flex", direction: "collumn" }}>
        <Skeleton
          count={5}
          height={30}
          width={250}
          style={{ marginBottom: 20 }}
        />
      </div>
    </div>
  );
}
