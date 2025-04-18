import React from "react";

interface GoogleDrivePosterViewerProps {
  abstractLink: string | undefined;
  width?: number;
  height?: number;
}

export const AbstractViewer: React.FC<GoogleDrivePosterViewerProps> = ({
  abstractLink = "",
  width = 640,
  height = 480,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Abstract: </h2>
      <div
        style={{ position: "relative", paddingBottom: "56.25%" }}
        className="h-screen"
      >
        {abstractLink?.length <= 0 ? (
          <div className="text-center flex justify-self-center h-max">
            <p>No abstract provided</p>
          </div>
        ) : (
          <iframe
            src={abstractLink}
            width={width}
            height={height}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};
