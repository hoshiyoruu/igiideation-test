import React from "react";

interface GoogleDriveVideoProps {
  videoLink: string | undefined;
  width?: number;
  height?: number;
}

export const VideoViewer: React.FC<GoogleDriveVideoProps> = ({
  videoLink = "",
  width = 640,
  height = 640,
}) => {
  const embedUrl = videoLink;
  console.log(videoLink);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Uploaded Video :</h2>
      <div className="h-screen">
        {videoLink.length <= 0 ? (
          <div className="flex justify-center text-center h-max">
            <p>No video provided</p>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            width={width}
            height={height}
            allow="autoplay; fullscreen"
            className="w-full h-full"
          ></iframe>
        )}
      </div>
    </div>
  );
};
