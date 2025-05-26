import { useEffect, useRef, useState } from "react";
import styles from "./PdfClass.module.scss";
import * as pdfjsLib from "pdfjs-dist";
import VectorLeft from "../../../../shared/assets/svg/VectorLeft.svg";
import VectorRight from "../../../../shared/assets/svg/VectorRight.svg";
import KeyBoardLetters from "../../../../shared/ui/KeyBoardLetters/KeyBoardLetters";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [showKeyBoard, setShowKeyBoard] = useState(false);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setError(null);
        setCurrentPage(1);

        const response = await fetch(url);
        if (!response.ok) throw new Error("Ошибка загрузки PDF");

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const loadingTask = pdfjsLib.getDocument(blobUrl);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);

        URL.revokeObjectURL(blobUrl);
      } catch (err) {
        console.error("Ошибка загрузки PDF:", err);
        setError("Не удалось загрузить PDF.");
      }
    };

    if (url) loadPdf();
  }, [url]);

  useEffect(() => {
    const renderPages = async () => {
      if (!pdfDoc) return;

      const render = async (
        pageNum: number,
        canvasRef: React.RefObject<HTMLCanvasElement | null>
      ) => {
        if (!canvasRef.current || pageNum > numPages) return;
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context!, viewport }).promise;
      };

      await render(currentPage, canvasRef1);

      if (currentPage + 1 <= numPages) {
        await render(currentPage + 1, canvasRef2);
        canvasRef2.current!.style.display = "block";
      } else {
        if (canvasRef2.current) canvasRef2.current.style.display = "none";
      }
    };

    renderPages();
  }, [pdfDoc, currentPage, numPages]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 2, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 2, numPages));

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className={styles.pdfViewer}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.viewer} ${numPages >= 3 ? styles.multiPage : ""}`}
      >
        <canvas
          ref={canvasRef1}
          className={`${styles.canvas} ${
            numPages >= 3 ? styles.canvasMore : ""
          }`}
        />
        <canvas
          ref={canvasRef2}
          className={`${styles.canvas} ${
            numPages >= 3 ? styles.canvasMore : ""
          }`}
        />
      </div>

      {numPages > 2 && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.pdfViewer__pagination}
        >
          {!showKeyBoard && (
            <>
              <button
                className={styles.pdfViewer__buttonPagination}
                onClick={handlePrev}
                disabled={currentPage <= 1}
              >
                <img src={VectorLeft} alt="" />
              </button>
              <div
                onClick={() => setShowKeyBoard(true)}
                className={styles.pdfViewer__Boxpage}
              >
                <span className={styles.pdfViewer__page}>
                  Страницы {currentPage}
                  {currentPage + 1 <= numPages
                    ? ` – ${currentPage + 1}`
                    : ""} / {numPages}
                </span>
              </div>
              <button
                className={styles.pdfViewer__buttonPagination}
                onClick={handleNext}
                disabled={currentPage + 1 > numPages}
              >
                <img src={VectorRight} alt="" />
              </button>
            </>
          )}
        </div>
      )}

      {showKeyBoard && (
        <div onClick={(e) => e.stopPropagation()}>
          <KeyBoardLetters
            onVisable={() => setShowKeyBoard(false)}
            keyBoardNumber
            maxValue={numPages}
            onInputChange={(val) => {
              const page = Number(val);
              if (!isNaN(page) && page >= 1 && page <= numPages) {
                const evenCorrected = page % 2 === 0 ? page - 1 : page;
                setCurrentPage(evenCorrected);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
