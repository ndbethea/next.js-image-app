import React, { useState } from "react";
import Head from "next/head";
import TransformImage from "../components/image";

const IndexPage = () => {
  // create an instance of the widget in a method triggered when clicking a button and a state variable imagePublicId..
  const [imagePublicId, setImagePublicId] = useState("");

  const [alt, setAlt] = useState("");
  const [crop, setCrop] = useState("scale");
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(200);

  const openWidget = () => {
    // create the widget
    // The createWidget() function creates a new upload widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "da2frto5b",
        uploadPreset: "vevih7cb",
      },
      (error, result) => {
        if (
          result.event === "success" &&
          result.info.resource_type === "image"
        ) {
          console.log(result.info);
          setImagePublicId(result.info.public_id);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };
  return (
    <>
      <Head>
        <title>How to Crop and Resize Image in the Browser</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <script
          src="https://widget.Cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Head>
      <div className="main">
        <div className="splitdiv" id="leftdiv">
          <h1 className="main-h1">
            How to Crop, Resize & Upload Image in the Browser using Cloudinary
            Transformation
          </h1>
          <div id="leftdivcard">
            <h2 className="main-h2">Resize Options</h2>
              <label className="form-control">Select Crop Type</label>
            <div>
              <label className="form-control">Scale</label>
              <input
                type="radio"
                value="scale"
                name="crop"
                onChange={(event) => setCrop(event.target.value)}
              />
            </div>
            <div>
              <label className="form-control">Crop</label>
              <input
                type="radio"
                value="crop"
                name="crop"
                onChange={(event) => setCrop(event.target.value)}
              />
            </div>
                <input
              type="number"
              placeholder="Height"
              onChange={(event) => setHeight(event.target.value)}
            />
            <input
              type="number"
              placeholder="Width"
              onChange={(event) => setWidth(event.target.value)}
            />
            </div>

          <button type="button" id="leftbutton" onClick={openWidget}>
            Upload Image
          </button>
        </div>

        <div className="splitdiv" id="rightdiv">
          <h1> Image will appear here</h1>
          <div id="rightdivcard">
            {imagePublicId ? (
              <TransformImage
                crop={crop}
                image={imagePublicId}
                width={width}
                height={height}
              />
            ) : (
              <h1> Image will appear here</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default IndexPage;
