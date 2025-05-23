import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderPDF = async () => {
      try {
        setError(null);

        // 1. Загружаем PDF вручную
        const response = await fetch(url);
        if (!response.ok) throw new Error("Ошибка загрузки PDF");

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob); // создаем blob URL

        // 2. Загружаем в PDF.js
        const loadingTask = pdfjsLib.getDocument(blobUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (canvas && context) {
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({
            canvasContext: context,
            viewport,
          }).promise;
        }

        URL.revokeObjectURL(blobUrl); // очистка
      } catch (err) {
        console.error("Ошибка рендеринга PDF:", err);
        setError("Не удалось загрузить PDF. Проверьте ссылку или CORS.");
      }
    };

    if (url) renderPDF();
  }, [url]);

  if (error) {
    return <div style={{ color: "red", padding: "10px" }}>{error}</div>;
  }

  return <canvas ref={canvasRef} />;
}



// import { useEffect, useRef, useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";
// import "pdfjs-dist/web/pdf_viewer.css";

// // Для TypeScript (опционально)
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// interface PdfViewerProps {
//   url: string;
// }

// export default function PdfViewer({ url }: PdfViewerProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!url) return;

//     const renderPDF = async () => {
//       try {
//         setError(null);
//         const loadingTask = pdfjsLib.getDocument({
//           url,
//           // Для поддержки CORS (если сервер не возвращает нужные заголовки)
//           withCredentials: false,
//         });

//         const pdf = await loadingTask.promise;
//         const page = await pdf.getPage(1);
//         const viewport = page.getViewport({ scale: 1.5 });

//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const context = canvas.getContext("2d");
//         if (!context) return;

//         canvas.height = viewport.height;
//         canvas.width = viewport.width;

//         await page.render({
//           canvasContext: context,
//           viewport,
//         }).promise;
//       } catch (err) {
//         console.error("PDF rendering error:", err);
//         setError("Не удалось загрузить PDF. Проверьте URL или CORS.");
//       }
//     };

//     renderPDF();
//   }, [url]);

//   if (error) {
//     return (
//       <div style={{ color: "red", padding: "10px" }}>
//         {error}
//         <br />
//         <iframe
//           src={url}
//           width="1000px"
//           height="1000px"
//           style={{ border: "none" }}
//         />
//       </div>
//     );
//   }

//   return <canvas ref={canvasRef} />;
// }