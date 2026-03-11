export const handlePrint = (elementId: string, title: string) => {
    const template = document.getElementById(elementId);
    if (!template) return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.right = "100vw";
    iframe.style.bottom = "100vh";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow?.document;
    if (!iframeDoc) return;

    iframeDoc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @page { size: A4 portrait; margin: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { width: 210mm; margin: 0; padding: 0; }
          #${elementId} { width: 210mm; min-height: 297mm; }
        </style>
      </head>
      <body>
        ${template.outerHTML}
        <script>
          window.onload = () => {
            setTimeout(() => {
              window.focus();
              window.print();
            }, 500);
          };
        </script>
      </body>
    </html>
  `);

  iframeDoc.close();
  setTimeout(() => {
    if (document.body.contains(iframe)) document.body.removeChild(iframe);
  }, 3000);
};