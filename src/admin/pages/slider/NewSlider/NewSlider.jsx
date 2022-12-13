import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import * as sliderService from "~/admin/services/sliderService";
import styles from "./NewSlider.module.scss";

const NewSlider = () => {
  const cx = classNames.bind(styles);
  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(true);
  const [imgList, setImgList] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const navigate= useNavigate()
  const typeActive = [
    { id: true, type: "Đang hoạt động", name: "active" },
    { id: false, type: "Tạm dừng", name: "active" },
  ];
  const [name, setName] = useState();
  const userInputs = [
    {
      id: 1,
      name: "name",
      label: "Tên slider",
      type: "text",
      pattern: "^[[A-Z]|[a-z]][[A-Z]|[a-z]|\\d|[_]]{7,29}$",
      err: "Hãy nhập tên slider",
      required: true,
    },
  ];
  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setImgList(e.target.value);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };
  const uploadImage = async(base64EncodedImage) => {
    const response = await sliderService.newSlider(name, content, active, base64EncodedImage);
    if (response.data.success === true) {
        await Swal.fire(`Bạn đã thêm slider ${name} thành công🥰`);
    setImgList("");
    setPreviewSource("");
    navigate("/admin/slider");
   window.location.reload();
  }}
  const handleFocus = (e) => {
    setFocused(true);
  };
  
  return (
    <div>
    <Navbar />
    <div className={cx("container")}>
      <Sidebar />
      <div className={cx("content")}>
    <div className={cx("new")}>
      <div className={cx("newContainer")}>
        <div className={cx("top")}>
          <h1>Thêm slider</h1>
        </div>
        <div className={cx("bottom")}>
          <div className={cx("left")}>
          {previewSource && (
              <img
                src={
                  previewSource
                }
                alt="chosen"
              />
            )}
          </div>
          <div className={cx("right")}>
            <form onSubmit={handleSubmitFile}>
                <div  className={cx("formInput")}>
                <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className={cx("icon")} />
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileInputChange}
                style={{ display: "none" }}
                multiple
              />
                </div>
              {userInputs.map((input) => (
                <div className={cx("formInput")} key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    {...input}
                    pattern={input.pattern}
                    value={name}
                    name={input.name}
                    onBlur={handleFocus}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                    focused={focused.toString()}
                  />
                  <span className={cx("err")}>{input.err}</span>
                </div>
              ))}
              {typeActive.map((input) => (
                <div className={cx("formRadio")} key={input.id}>
                  <input
                    type="radio"
                    name={input.name}
                    onClick={(e) => setActive(input.id)}
                    checked={input.id === active ? true : false}
                  />
                  <label>{input.type}</label>
                </div>
              ))}
              <div className={cx("formInput-desc")}>
                <label>Description</label>
                <textarea
                  rows="4"
                  cols="50"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  value={content}
                ></textarea>
              </div>
              <button className={cx("link")}>Thêm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default NewSlider;
