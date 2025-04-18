import React from "react";

interface GoogleDrivePosterViewerProps {
  supportingDocumentLink: string | undefined;
  width?: number;
  height?: number;
}

export const SupportingDocumentsViewer: React.FC<
  GoogleDrivePosterViewerProps
> = ({ supportingDocumentLink = "", width = 640, height = 480 }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Supporting Document: </h2>
      <div
        style={{ position: "relative", paddingBottom: "56.25%" }}
        className="h-screen"
      >
        {supportingDocumentLink.length <= 0 ? (
          <div className="flex justify-center h-max text-center">
            <p>Supporting document is not provided.</p>
          </div>
        ) : (
          <iframe
            src={supportingDocumentLink}
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
