export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadFile(content: string, filename: string, mimeType = "text/plain"): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadSVG(svgContent: string, filename: string): void {
  downloadFile(svgContent, filename, "image/svg+xml");
}

export function downloadCSS(css: string, filename: string): void {
  downloadFile(css, filename, "text/css");
}

export function downloadHTML(html: string, filename: string): void {
  downloadFile(html, filename, "text/html");
}

export function downloadJSON(json: string, filename: string): void {
  downloadFile(json, filename, "application/json");
}

export function wrapInHTML(css: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Studio Export</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui, sans-serif; }
    ${css}
  </style>
</head>
<body>
  ${bodyContent}
</body>
</html>`;
}

export function wrapInReactComponent(css: string, componentName: string, jsx: string): string {
  return `export function ${componentName}() {
  return (
    <div style={{
      ${css
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => "      " + line)
        .join("\n")}
    }}>
      ${jsx}
    </div>
  );
}`;
}
